package be.mytcc.scipio.model.communistSplit;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CommunistSplitGroupRepository extends JpaRepository<CommunistSplitGroup, Long> {

    @Query("SELECT c FROM CommunistSplitGroup c, CommunistSplitGroupUser cu WHERE cu.keycloakId = :id AND cu.splitGroup.id = c.id")
    List<CommunistSplitGroup> findAllByUserId(String id);
}
