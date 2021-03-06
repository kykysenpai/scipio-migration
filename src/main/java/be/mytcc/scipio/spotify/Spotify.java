package be.mytcc.scipio.spotify;

import be.mytcc.scipio.model.spotify.AlbumRelease;
import be.mytcc.scipio.model.spotify.AlbumReleaseArtist;
import be.mytcc.scipio.model.spotify.AlbumReleaseRepository;
import be.mytcc.scipio.model.spotify.AlbumReleaseSubscription;
import be.mytcc.scipio.model.spotify.AlbumReleaseSubscriptionRepository;
import be.mytcc.scipio.model.spotify.ArtistSearch;
import com.neovisionaries.i18n.CountryCode;
import com.wrapper.spotify.SpotifyApi;
import com.wrapper.spotify.enums.AlbumType;
import com.wrapper.spotify.model_objects.credentials.ClientCredentials;
import com.wrapper.spotify.model_objects.specification.AlbumSimplified;
import com.wrapper.spotify.model_objects.specification.Artist;
import com.wrapper.spotify.model_objects.specification.ArtistSimplified;
import com.wrapper.spotify.model_objects.specification.Paging;
import net.dv8tion.jda.core.JDA;
import net.dv8tion.jda.core.entities.TextChannel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class Spotify {

    private Logger logger = LoggerFactory.getLogger(Spotify.class);

    @Value("${music_notifications_discord_channel}")
    private String discordChannel;

    @Autowired
    private JDA jda;

    @Autowired
    private SpotifyApi spotify;

    @Autowired
    private AlbumReleaseRepository albumReleaseRepository;

    @Autowired
    private AlbumReleaseSubscriptionRepository albumReleaseSubscriptionRepository;

    @Scheduled(cron = "0 0 */1 * * *")
    public void getAlbums() throws Exception {
        refreshSpotifyClientToken();
        List<AlbumReleaseSubscription> subscriptions = getSubscribedArtists();
        for (AlbumReleaseSubscription subscription : subscriptions) {
            List<AlbumSimplified> searchResult = getNewAlbumsForArtist(subscription);
            for (AlbumSimplified albumSimplified : searchResult) {
                Optional<AlbumRelease> alreadySaved = albumReleaseRepository.findAlbumReleaseByLink(albumSimplified.getExternalUrls().get("spotify"));
                if (alreadySaved.isPresent()) {
                    continue;
                }
                AlbumRelease albumRelease = createAlbumReleaseFromSimplified(albumSimplified);
                albumReleaseRepository.save(albumRelease);
                notifyDiscordOfNewRelease(albumRelease, subscription);
            }
        }
    }

    private List<AlbumReleaseSubscription> getSubscribedArtists() {
        return albumReleaseSubscriptionRepository.findAll();
    }

    public List<ArtistSearch> searchArtists(String query) throws Exception {
        refreshSpotifyClientToken();
        Paging<Artist> artistPaging = spotify.searchArtists(query).limit(10).build().execute();
        List<ArtistSearch> artistsNames = new ArrayList<>();
        for (Artist artist : artistPaging.getItems()) {
            artistsNames.add(new ArtistSearch(artist.getName(), artist.getId()));
        }
        return artistsNames;
    }

    private void refreshSpotifyClientToken() throws Exception {
        ClientCredentials clientCredentials = spotify.clientCredentials().build().execute();
        spotify.setAccessToken(clientCredentials.getAccessToken());
    }

    private List<AlbumSimplified> getNewAlbumsForArtist(AlbumReleaseSubscription subscription) throws Exception {
        Paging<AlbumSimplified> albums = spotify.getArtistsAlbums(subscription.getArtistId()).album_type("album,single").market(CountryCode.BE).build().execute();
        List<AlbumSimplified> albumSimplifieds = Arrays.stream(albums.getItems()).filter(album -> isAlbumANewRelease(album.getReleaseDate())).collect(Collectors.toList());

        logger.info("------------------------");
        albumSimplifieds.forEach(albumSimplified -> {
            logger.info("////");
            logger.info("Subscribed artist ID : " + subscription.getArtistId());
            logger.info("Artist IDs on the Spotify API : ");
            for (ArtistSimplified artist : albumSimplified.getArtists()) {
                logger.info(artist.getId() + " - " + artist.getName());
            }
            logger.info(albumSimplified.getName() + "(" + albumSimplified.getExternalUrls().get("spotify") + ")");
            logger.info("////");
        });

        return albumSimplifieds;
    }

    private boolean isAlbumANewRelease(String date) {
        try {
            Date albumRelease = getParsedDate(date);
            return albumRelease.toInstant().isAfter(ZonedDateTime.now().plusDays(-30).toInstant());
        } catch (Exception ex) {
            logger.error("Error while parsing Release Date to see if it's new", ex);
            return false;
        }
    }

    private void notifyDiscordOfNewRelease(AlbumRelease albumRelease, AlbumReleaseSubscription subscription) {
        TextChannel publicChannel = jda.getTextChannelById(discordChannel);

        String description = getDescription(albumRelease);

        publicChannel.sendMessage(description).queue();

        subscription.getUsersToNotify().forEach(user -> {
            jda.getUserById(user.getDiscordId()).openPrivateChannel().queue(channel -> {
                channel.sendMessage(description).queue();
            });
        });
    }

    private String getDescription(AlbumRelease albumRelease) {
        StringBuilder description = new StringBuilder();
        albumRelease.getAlbumReleaseArtists().forEach(artist -> {
            description.append(artist.getName());
            description.append(" and ");
        });
        int toRemove = description.lastIndexOf(" and ");
        description.delete(toRemove, description.length());
        switch (AlbumType.keyOf(albumRelease.getType())) {
            case ALBUM:
                description.append(" dropped a new Album");
                break;
            case COMPILATION:
                description.append(" dropped a new Compilation");
                break;
            case SINGLE:
                description.append(" dropped a new Single");
                break;
            default:
                description.append(" dropped new Title(s)");
                break;
        }
        description.append("\n");
        description.append(albumRelease.getLink());
        return description.toString();
    }

    private AlbumRelease createAlbumReleaseFromSimplified(AlbumSimplified albumSimplified) throws Exception {
        AlbumRelease albumRelease = new AlbumRelease();
        albumRelease.setName(albumSimplified.getName());
        Set<AlbumReleaseArtist> artists = new HashSet<>();
        for (ArtistSimplified albumSimplifiedArtist : albumSimplified.getArtists()) {
            AlbumReleaseArtist albumReleaseArtist = new AlbumReleaseArtist();
            albumReleaseArtist.setName(albumSimplifiedArtist.getName());
            albumReleaseArtist.setLink(albumSimplifiedArtist.getExternalUrls().get("spotify"));
            albumReleaseArtist.setAlbum(albumRelease);
            artists.add(albumReleaseArtist);
        }
        albumRelease.setReleaseDate(getParsedDate(albumSimplified.getReleaseDate()));
        albumRelease.setType(albumSimplified.getAlbumType().getType());
        albumRelease.setAlbumReleaseArtists(artists);
        albumRelease.setImageLink(albumSimplified.getImages()[0].getUrl());
        albumRelease.setLink(albumSimplified.getExternalUrls().get("spotify"));
        return albumRelease;
    }

    private Date getParsedDate(String releaseDate) throws ParseException {
        try {
            return new SimpleDateFormat("yyyy-MM-dd").parse(releaseDate);
        } catch (ParseException notFullDateFormat) {
            try {
                return new SimpleDateFormat("yyyy-MM").parse(releaseDate);
            } catch (ParseException notYearMonthFormat) {
                return new SimpleDateFormat("yyyy").parse(releaseDate);
            }
        }
    }

}
