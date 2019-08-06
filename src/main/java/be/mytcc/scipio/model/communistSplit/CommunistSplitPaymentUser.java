package be.mytcc.scipio.model.communistSplit;

import be.mytcc.scipio.model.common.User;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
public class CommunistSplitPaymentUser {

    @Id
    @GeneratedValue
    private long id;

    @Column(name = "amount")
    private float owes;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user", nullable = false)
    private User user;

    @ManyToOne(optional = false)
    @JoinColumn(name = "payment", nullable = false)
    @JsonIgnore
    private CommunistSplitPayment payment;

    public CommunistSplitPayment getPayment() {
        return payment;
    }

    public void setPayment(CommunistSplitPayment payment) {
        this.payment = payment;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public float getOwes() {
        return owes;
    }

    public void setOwes(float owes) {
        this.owes = owes;
    }
}
