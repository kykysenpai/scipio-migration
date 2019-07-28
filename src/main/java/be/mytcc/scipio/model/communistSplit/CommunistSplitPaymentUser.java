package be.mytcc.scipio.model.communistSplit;

import be.mytcc.scipio.model.common.User;

import javax.persistence.*;

@Entity
public class CommunistSplitPaymentUser {

    @Id
    @GeneratedValue
    private long id;

    @Column(name = "amount")
    private float owns;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user", nullable = false)
    private User user;

    @ManyToOne(optional = false)
    @JoinColumn(name = "payment", nullable = false)
    private CommunistSplitPayment payment;

    public CommunistSplitPayment getPayment() {
        return payment;
    }

    public void setPayment(CommunistSplitPayment payment) {
        this.payment = payment;
    }

    public float getOwns() {
        return owns;
    }

    public void setOwns(float owns) {
        this.owns = owns;
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

    @Override
    public String toString() {
        return "CommunistSplitPaymentUser{" +
                "id=" + id +
                ", user= " + user.getUsername() +
                ", amount=" + owns +
                '}';
    }
}
