package be.mytcc.scipio.model.spotify;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity
@EntityListeners(AuditingEntityListener.class)
public class AlbumRelease {

    @Id
    @GeneratedValue
    private long id;

    @CreatedDate
    @Column(name = "release_date")
    private Date releaseDate;

    @Column(name = "name")
    private String name;

    @Column(name = "link", unique = true)
    private String link;

    @Column(name = "image_link")
    private String imageLink;

    @Column(name = "type")
    private String type;

    @OneToMany(mappedBy = "subscription", cascade = CascadeType.ALL)
    private Set<AlbumReleaseGenre> genres;

    @OneToMany(mappedBy = "album", cascade = CascadeType.ALL)
    private Set<AlbumReleaseArtist> albumReleaseArtists;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Date getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(Date releaseDate) {
        this.releaseDate = releaseDate;
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

    public String getImageLink() {
        return imageLink;
    }

    public void setImageLink(String imageLink) {
        this.imageLink = imageLink;
    }

    public Set<AlbumReleaseArtist> getAlbumReleaseArtists() {
        return albumReleaseArtists;
    }

    public void setAlbumReleaseArtists(Set<AlbumReleaseArtist> albumReleaseArtists) {
        this.albumReleaseArtists = albumReleaseArtists;
    }

    public Set<AlbumReleaseGenre> getGenres() {
        return genres;
    }

    public void setGenres(Set<AlbumReleaseGenre> genres) {
        this.genres = genres;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    @Override
    public String toString() {
        return "AlbumRelease{" +
                "id=" + id +
                ", releaseDate=" + releaseDate +
                ", name='" + name + '\'' +
                ", link='" + link + '\'' +
                ", imageLink='" + imageLink + '\'' +
                ", albumReleaseArtists=" + albumReleaseArtists +
                '}';
    }
}
