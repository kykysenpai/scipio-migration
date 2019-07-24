package be.mytcc.scipio.model.communistSplit;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity
public class CommunistSplitPayment {

    @Id
    @GeneratedValue
    private long id;

    @CreatedDate
    @Column(name = "created_date")
    private Date createdDate;

    @LastModifiedDate
    @Column(name = "last_modified_date")
    private Date lastModifiedDate;

    @OneToMany(mappedBy = "payment", cascade = CascadeType.ALL)
    private Set<CommunistSplitPaymentUser> splitPaymentUsers;

    @ManyToOne(optional = false)
    @JoinColumn(name = "split_group", nullable = false)
    private CommunistSplitGroup splitGroup;

    public CommunistSplitPayment() {
    }

    public CommunistSplitPayment(Date createdDate, Date lastModifiedDate, CommunistSplitGroup splitGroup, Set<CommunistSplitPaymentUser> splitPaymentUsers) {
        this.createdDate = createdDate;
        this.lastModifiedDate = lastModifiedDate;
        this.splitGroup = splitGroup;
        this.splitPaymentUsers = splitPaymentUsers;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    public Date getLastModifiedDate() {
        return lastModifiedDate;
    }

    public void setLastModifiedDate(Date lastModifiedDate) {
        this.lastModifiedDate = lastModifiedDate;
    }

    public CommunistSplitGroup getSplitGroup() {
        return splitGroup;
    }

    public void setSplitGroup(CommunistSplitGroup splitGroup) {
        this.splitGroup = splitGroup;
    }

    public Set<CommunistSplitPaymentUser> getSplitPaymentUsers() {
        return splitPaymentUsers;
    }

    public void setSplitPaymentUsers(Set<CommunistSplitPaymentUser> splitPaymentUsers) {
        this.splitPaymentUsers = splitPaymentUsers;
    }

    @Override
    public String toString() {
        return "CommunistSplitPayment{" +
                "id=" + id +
                ", createdDate=" + createdDate +
                ", lastModifiedDate=" + lastModifiedDate +
                ", splitPaymentUsers=" + splitPaymentUsers +
                ", splitGroup=" + splitGroup +
                '}';
    }
}
