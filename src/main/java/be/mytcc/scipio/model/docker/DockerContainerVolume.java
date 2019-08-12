package be.mytcc.scipio.model.docker;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
public class DockerContainerVolume {

    @Id
    @GeneratedValue
    private long id;

    @Column(name = "volume_path")
    private String volumePath;

    @ManyToOne(optional = false)
    @JoinColumn(name = "container", nullable = false)
    @JsonIgnore
    private DockerContainer container;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getVolumePath() {
        return volumePath;
    }

    public void setVolumePath(String volumePath) {
        this.volumePath = volumePath;
    }

    public DockerContainer getContainer() {
        return container;
    }

    public void setContainer(DockerContainer container) {
        this.container = container;
    }
}
