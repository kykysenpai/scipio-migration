package be.mytcc.scipio.model.spotify;

import be.mytcc.scipio.model.common.User;

import javax.persistence.*;
import java.util.Set;

@Entity
public class AlbumReleaseSubscription {

    @Id
    @GeneratedValue
    private long id;

    @Column(name = "artist_name", nullable = false)
    private String artistName;

    @Column(name = "artist_id", unique = true, nullable = false)
    private String artistId;

    @ManyToOne(optional = false)
    @JoinColumn(name = "creator")
    private User creator;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(joinColumns = @JoinColumn(name = "subscription"),
            inverseJoinColumns = @JoinColumn(name = "user"))
    private Set<User> usersToNotify;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getArtistName() {
        return artistName;
    }

    public void setArtistName(String artistName) {
        this.artistName = artistName;
    }

    public Set<User> getUsersToNotify() {
        return usersToNotify;
    }

    public void setUsersToNotify(Set<User> usersToNotify) {
        this.usersToNotify = usersToNotify;
    }

    public User getCreator() {
        return creator;
    }

    public void setCreator(User creator) {
        this.creator = creator;
    }

    public String getArtistId() {
        return artistId;
    }

    public void setArtistId(String artistId) {
        this.artistId = artistId;
    }
}
