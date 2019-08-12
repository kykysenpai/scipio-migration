package be.mytcc.scipio.model.docker;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
public class DockerContainerEnvironment {

    @Id
    @GeneratedValue
    private long id;

    @Column(name = "env")
    private String env;

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

    public String getEnv() {
        return env;
    }

    public void setEnv(String env) {
        this.env = env;
    }

    public DockerContainer getContainer() {
        return container;
    }

    public void setContainer(DockerContainer container) {
        this.container = container;
    }
}
