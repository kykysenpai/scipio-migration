package be.mytcc.scipio.controller.spotify;

import be.mytcc.scipio.model.common.User;
import be.mytcc.scipio.model.spotify.*;
import be.mytcc.scipio.spotify.Spotify;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController()
@RequestMapping("/api/spotify")
public class SpotifyController {

    private Logger logger = LoggerFactory.getLogger(SpotifyController.class);

    @Autowired
    private AlbumReleaseSubscriptionRepository albumReleaseSubscriptionRepository;

    @Autowired
    private AlbumReleaseRepository albumReleaseRepository;

    @Autowired
    private Spotify spotify;

    @GetMapping("/subscriptions")
    public List<AlbumReleaseSubscription> getAllAlbumSubs() {
        return albumReleaseSubscriptionRepository.findAll();
    }

    @PostMapping("/subscriptions")
    public AlbumReleaseSubscription createSubscription(@RequestBody AlbumReleaseSubscription albumReleaseSubscription, @RequestAttribute("user") User user) {
        albumReleaseSubscription.getUsersToNotify().add(user);
        albumReleaseSubscription.setCreator(user);
        try {
            return albumReleaseSubscriptionRepository.save(albumReleaseSubscription);
        } catch (DataIntegrityViolationException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "This artist is already registered", ex);
        } catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal Error", ex);
        }
    }

    @GetMapping("/releases")
    public List<AlbumRelease> getAllAlbumReleases() {
        return albumReleaseRepository.findAll();
    }

    @PostMapping("/search")
    public List<ArtistSearch> searchArtist(@RequestBody String query) {
        try {
            return spotify.searchArtists(query);
        } catch (Exception ex) {
            logger.error("Error while searching for artist", ex);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error while searching for artist", ex);
        }
    }

    @PostMapping("/notifications")
    public void subscribeToNofitications(@RequestBody long subscriptionId, @RequestAttribute("user") User user) {
        Optional<AlbumReleaseSubscription> optionalSub = albumReleaseSubscriptionRepository.findById(subscriptionId);
        if (!optionalSub.isPresent()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No such subscription");
        } else {
            AlbumReleaseSubscription sub = optionalSub.get();
            if (sub.getUsersToNotify().contains(user)) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "This user is already subscribed to these notifications");
            } else {
                sub.getUsersToNotify().add(user);
                albumReleaseSubscriptionRepository.save(sub);
            }
        }
    }

    @DeleteMapping("/notifications/{subscriptionId}")
    public void unsubscribeFromNotifications(@PathVariable("subscriptionId") long subscriptionId, @RequestAttribute("user") User user) {
        Optional<AlbumReleaseSubscription> optionalSub = albumReleaseSubscriptionRepository.findById(subscriptionId);
        if (!optionalSub.isPresent()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No such subscription");
        } else {
            AlbumReleaseSubscription sub = optionalSub.get();
            if (!sub.getUsersToNotify().contains(user)) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "This user hasn't yet subscribe to these notifications");
            } else {
                sub.getUsersToNotify().remove(user);
                albumReleaseSubscriptionRepository.save(sub);
            }
        }
    }
}
