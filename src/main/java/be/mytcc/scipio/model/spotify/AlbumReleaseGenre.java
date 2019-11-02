package be.mytcc.scipio.model.spotify;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
public class AlbumReleaseGenre {

    @Id
    @GeneratedValue
    private long id;

    @Column(name = "name")
    private String name;

    @ManyToOne(optional = false)
    @JoinColumn(name = "album_release", nullable = false)
    @JsonIgnore
    private AlbumReleaseSubscription subscription;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public AlbumReleaseSubscription getSubscription() {
        return subscription;
    }

    public void setSubscription(AlbumReleaseSubscription subscription) {
        this.subscription = subscription;
    }

    @Override
    public String toString() {
        return "AlbumReleaseGenre{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }
}
