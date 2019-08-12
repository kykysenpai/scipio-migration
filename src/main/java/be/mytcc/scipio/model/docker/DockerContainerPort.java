package be.mytcc.scipio.model.docker;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
public class DockerContainerPort {

    @Id
    @GeneratedValue
    private long id;

    @Column(name = "port_binding")
    private String portBinding;

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

    public String getPortBinding() {
        return portBinding;
    }

    public void setPortBinding(String portBinding) {
        this.portBinding = portBinding;
    }

    public DockerContainer getContainer() {
        return container;
    }

    public void setContainer(DockerContainer container) {
        this.container = container;
    }
}
