package be.mytcc.scipio.model.docker;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DockerContainerRepository extends JpaRepository<DockerContainer, Long> {
}