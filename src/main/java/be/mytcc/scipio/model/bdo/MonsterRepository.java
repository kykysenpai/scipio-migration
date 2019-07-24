package be.mytcc.scipio.model.bdo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MonsterRepository extends JpaRepository<Monster, Long> {
    Optional<Monster> findByName(String name);
}
