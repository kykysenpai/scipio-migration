package be.mytcc.scipio.model.spotify;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class AlbumReleaseSubscription {

    @Id
    @GeneratedValue
    private long id;

    @Column(name = "artist_name", unique = true, nullable = false)
    private String artistName;

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

    @Override
    public String toString() {
        return "AlbumReleaseSubscription{" +
                "id=" + id +
                ", artistName='" + artistName + '\'' +
                '}';
    }
}
