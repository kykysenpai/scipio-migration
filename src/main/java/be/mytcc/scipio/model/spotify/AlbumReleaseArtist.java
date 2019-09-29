package be.mytcc.scipio.model.spotify;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
public class AlbumReleaseArtist {

    @Id
    @GeneratedValue
    private long id;

    @Column(name = "name")
    private String name;

    @Column(name = "link")
    private String link;

    @ManyToOne(optional = false)
    @JoinColumn(name = "album", nullable = false)
    @JsonIgnore
    private AlbumRelease album;

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

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public AlbumRelease getAlbum() {
        return album;
    }

    public void setAlbum(AlbumRelease album) {
        this.album = album;
    }

    @Override
    public String toString() {
        return "AlbumReleaseArtist{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", link='" + link + '\'' +
                '}';
    }
}
