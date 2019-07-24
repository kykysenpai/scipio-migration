package be.mytcc.scipio.model.bdo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HuntRepository extends JpaRepository<Hunt, Long> {
    @Query("SELECT h FROM Hunt h WHERE h.guildMember.name = :guildMemberName")
    List<Hunt> findByGuildMemberName(String guildMemberName);
}
