package be.mytcc.scipio.model.spotify;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AlbumReleaseArtistRepository extends JpaRepository<AlbumReleaseArtist, Long> {
}
