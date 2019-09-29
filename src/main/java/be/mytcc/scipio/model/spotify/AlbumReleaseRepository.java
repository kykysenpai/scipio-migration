package be.mytcc.scipio.model.spotify;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AlbumReleaseRepository extends JpaRepository<AlbumRelease, Long> {
    Optional<AlbumRelease> findAlbumReleaseByLink(String link);
}
