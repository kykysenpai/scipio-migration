package be.mytcc.scipio.model.communistSplit;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommunistSplitGroupRepository extends JpaRepository<CommunistSplitGroup, Long> {
    List<CommunistSplitGroup> findByUsers_keycloakId(String keycloakId);
}
