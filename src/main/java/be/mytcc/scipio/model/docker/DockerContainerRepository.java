package be.mytcc.scipio.model.docker;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DockerContainerRepository extends JpaRepository<DockerContainer, Long> {
    Optional<DockerContainer> findDockerContainerByAlias(String alias);
}
