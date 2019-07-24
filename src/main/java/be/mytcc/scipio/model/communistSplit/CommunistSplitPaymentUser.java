package be.mytcc.scipio.model.communistSplit;

import javax.persistence.*;

@Entity
public class CommunistSplitPaymentUser {

    @Id
    @GeneratedValue
    private long id;

    @Column(name = "user")
    private String keycloakId;

    @Column(name = "amount")
    private float amount;

    @ManyToOne(optional = false)
    @JoinColumn(name = "payment", nullable = false)
    private CommunistSplitPayment payment;

    public CommunistSplitPaymentUser(){
    }

    public CommunistSplitPaymentUser(String keycloakId, float amount, CommunistSplitPayment payment){
        this.keycloakId = keycloakId;
        this.amount = amount;
        this.payment = payment;
    }

    public CommunistSplitPaymentUser(long id, String keycloakId, float amount, CommunistSplitPayment payment){
        this.id = id;
        this.keycloakId = keycloakId;
        this.amount = amount;
        this.payment = payment;
    }

    public CommunistSplitPayment getPayment() {
        return payment;
    }

    public void setPayment(CommunistSplitPayment payment) {
        this.payment = payment;
    }

    public float getAmount() {
        return amount;
    }

    public void setAmount(float amount) {
        this.amount = amount;
    }

    public String getKeycloakId() {
        return keycloakId;
    }

    public void setKeycloakId(String keycloakId) {
        this.keycloakId = keycloakId;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "CommunistSplitPaymentUser{" +
                "id=" + id +
                ", keycloakId='" + keycloakId + '\'' +
                ", amount=" + amount +
                '}';
    }
}
