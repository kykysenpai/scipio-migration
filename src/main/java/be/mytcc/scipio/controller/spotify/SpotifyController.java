package be.mytcc.scipio.controller.spotify;

import be.mytcc.scipio.model.spotify.AlbumRelease;
import be.mytcc.scipio.model.spotify.AlbumReleaseRepository;
import be.mytcc.scipio.model.spotify.AlbumReleaseSubscription;
import be.mytcc.scipio.model.spotify.AlbumReleaseSubscriptionRepository;
import be.mytcc.scipio.spotify.Spotify;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/spotify")
public class SpotifyController {

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
    public AlbumReleaseSubscription createSubscription(@RequestBody AlbumReleaseSubscription albumReleaseSubscription) {
        return albumReleaseSubscriptionRepository.save(albumReleaseSubscription);
    }

    @GetMapping("/releases")
    public List<AlbumRelease> getAllAlbumReleases() {
        return albumReleaseRepository.findAll();
    }

    @PostMapping("/search")
    public List<String> searchArtist(@RequestBody String query) {
        try {
            return spotify.searchArtists(query);
        } catch (Exception ex) {
            return Collections.emptyList();
        }
    }
}
