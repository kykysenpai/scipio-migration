package be.mytcc.scipio.spotify;

import be.mytcc.scipio.model.spotify.*;
import com.wrapper.spotify.SpotifyApi;
import com.wrapper.spotify.model_objects.credentials.ClientCredentials;
import com.wrapper.spotify.model_objects.specification.AlbumSimplified;
import com.wrapper.spotify.model_objects.specification.Artist;
import com.wrapper.spotify.model_objects.specification.ArtistSimplified;
import com.wrapper.spotify.model_objects.specification.Paging;
import net.dv8tion.jda.core.EmbedBuilder;
import net.dv8tion.jda.core.JDA;
import net.dv8tion.jda.core.entities.MessageEmbed;
import net.dv8tion.jda.core.entities.TextChannel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class Spotify {

    private Logger logger = LoggerFactory.getLogger(Spotify.class);

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
        initSpotifyClientToken();
        List<AlbumReleaseSubscription> subscriptions = getSubscribedArtists();
        for (AlbumReleaseSubscription subscription : subscriptions) {
            Paging<AlbumSimplified> searchResult = getNewAlbumsForArtist(subscription);
            for (AlbumSimplified albumSimplified : searchResult.getItems()) {
                Optional<AlbumRelease> alreadySaved = albumReleaseRepository.findAlbumReleaseByLink(albumSimplified.getExternalUrls().get("spotify"));
                if (alreadySaved.isPresent()) {
                    logger.info(albumSimplified.getName() + "(" + albumSimplified.getExternalUrls().get("spotify") + ") was already saved");
                    continue;
                }
                AlbumRelease albumRelease = createAlbumReleaseFromSimplified(albumSimplified);
                albumReleaseRepository.save(albumRelease);
                notifyDiscordOfNewRelease(albumRelease);
            }
        }
    }

    private List<AlbumReleaseSubscription> getSubscribedArtists() {
        return albumReleaseSubscriptionRepository.findAll();
    }

    public List<String> searchArtists(String query) throws Exception {
        logger.info("Search query : " + query);
        Paging<Artist> artistPaging = spotify.searchArtists(query).limit(10).build().execute();
        List<String> artistsNames = new ArrayList<>();
        logger.info("FOUND " + artistPaging.getTotal() + " artists matching");
        for (Artist artist : artistPaging.getItems()) {
            artistsNames.add(artist.getName());
            logger.info(artist.getName());
        }
        return artistsNames;
    }

    private void initSpotifyClientToken() throws Exception {
        ClientCredentials clientCredentials = spotify.clientCredentials().build().execute();
        spotify.setAccessToken(clientCredentials.getAccessToken());
    }

    private Paging<AlbumSimplified> getNewAlbumsForArtist(AlbumReleaseSubscription subscription) throws Exception {
        return spotify.searchAlbums("artist:" + subscription.getArtistName() + " tag:new").build().execute();
    }

    private void notifyDiscordOfNewRelease(AlbumRelease albumRelease) {
        TextChannel channel = jda.getTextChannelById("555886032680386581");
        MessageEmbed messageEmbed = new EmbedBuilder()
                .setTitle("Listen on Spotify", albumRelease.getLink())
                .setDescription("New album release : " + albumRelease.getName())
                .setImage(albumRelease.getImageLink())
                .setTimestamp(albumRelease.getReleaseDate().toInstant())
                .build();
        channel.sendMessage(messageEmbed).queue();
    }

    private AlbumRelease createAlbumReleaseFromSimplified(AlbumSimplified albumSimplified) {
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
        albumRelease.setAlbumReleaseArtists(artists);
        albumRelease.setImageLink(albumSimplified.getImages()[0].getUrl());
        albumRelease.setLink(albumSimplified.getExternalUrls().get("spotify"));
        return albumRelease;
    }

}
