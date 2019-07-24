package be.mytcc.scipio.model.communistSplit;

import javax.persistence.*;

@Entity
public class CommunistSplitGroupUser {

    @Id
    @GeneratedValue
    private long id;

    @Column(name = "keycloak_id")
    private String keycloakId;

    @ManyToOne(optional = false)
    @JoinColumn(name = "split_group", nullable = false)
    private CommunistSplitGroup splitGroup;

    public CommunistSplitGroupUser() {
    }

    public CommunistSplitGroupUser(String keycloakId, CommunistSplitGroup splitGroup) {
        this.keycloakId = keycloakId;
        this.splitGroup = splitGroup;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getKeycloakId() {
        return keycloakId;
    }

    public void setKeycloakId(String keycloakId) {
        this.keycloakId = keycloakId;
    }

    public CommunistSplitGroup getSplitGroup() {
        return splitGroup;
    }

    public void setGroup(CommunistSplitGroup splitGroup) {
        this.splitGroup = splitGroup;
    }

    @Override
    public String toString() {
        return "CommunistSplitGroupUser{" +
                "id=" + id +
                ", keycloakId='" + keycloakId + '\'' +
                '}';
    }
}
