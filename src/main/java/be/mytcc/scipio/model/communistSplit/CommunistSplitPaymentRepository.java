package be.mytcc.scipio.model.communistSplit;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CommunistSplitPaymentRepository extends JpaRepository<CommunistSplitPayment, Long> {
    @Query("SELECT c FROM CommunistSplitPayment c WHERE c.splitGroup.id = :id")
    List<CommunistSplitPayment> findAllBySplitGroupId(long id);
}
