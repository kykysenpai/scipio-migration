package be.mytcc.scipio.model.docker;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DockerContainerVolumeRepository extends JpaRepository<DockerContainerVolume, Long> {
}
