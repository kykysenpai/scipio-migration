package be.mytcc.scipio.model.communistSplit;

import be.mytcc.scipio.model.common.User;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.sql.Blob;
import java.util.Date;
import java.util.Set;

@Entity
@EntityListeners(AuditingEntityListener.class)
public class CommunistSplitPayment {

    @Id
    @GeneratedValue
    private long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "payer_id", nullable = false)
    private User payer;

    @Column(name = "title")
    private String title;

    @CreatedDate
    @Column(name = "created_date")
    private Date createdDate;

    @Column(name = "image")
    private String image;

    @LastModifiedDate
    @Column(name = "last_modified_date")
    private Date lastModifiedDate;

    @Column(name = "amount")
    private double amount;

    @Column(name = "description")
    private String description;

    @OneToMany(mappedBy = "payment", cascade = CascadeType.ALL)
    private Set<CommunistSplitPaymentUser> splitPaymentUsers;

    @ManyToOne(optional = false)
    @JoinColumn(name = "split_group", nullable = false)
    private CommunistSplitGroup splitGroup;

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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public User getPayer() {
        return payer;
    }

    public void setPayer(User payer) {
        this.payer = payer;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
