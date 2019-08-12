package be.mytcc.scipio.model.docker;

import javax.persistence.*;
import java.util.Set;

@Entity
public class DockerContainer {

    @Id
    @GeneratedValue
    private long id;

    @Column(name = "image")
    private String image;

    @Column(name = "alias")
    private String alias;

    @Column(name = "entrypoint")
    private String entrypoint;

    @Column(name = "working_dir")
    private String workingDir;

    @Column(name = "stdin_open")
    private String stdinOpen;

    @Column(name= "cmd")
    private String cmd;

    @OneToMany(mappedBy = "container", cascade = CascadeType.ALL)
    private Set<DockerContainerVolume> volumes;

    @OneToMany(mappedBy = "container", cascade = CascadeType.ALL)
    private Set<DockerContainerPort> ports;

    @OneToMany(mappedBy = "container", cascade = CascadeType.ALL)
    private Set<DockerContainerEnvironment> envs;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getAlias() {
        return alias;
    }

    public void setAlias(String alias) {
        this.alias = alias;
    }

    public String getEntrypoint() {
        return entrypoint;
    }

    public void setEntrypoint(String entrypoint) {
        this.entrypoint = entrypoint;
    }

    public String getWorkingDir() {
        return workingDir;
    }

    public void setWorkingDir(String workingDir) {
        this.workingDir = workingDir;
    }

    public String getStdinOpen() {
        return stdinOpen;
    }

    public void setStdinOpen(String stdinOpen) {
        this.stdinOpen = stdinOpen;
    }

    public String getCmd() {
        return cmd;
    }

    public void setCmd(String cmd) {
        this.cmd = cmd;
    }

    public Set<DockerContainerVolume> getVolumes() {
        return volumes;
    }

    public void setVolumes(Set<DockerContainerVolume> volumes) {
        this.volumes = volumes;
    }

    public Set<DockerContainerPort> getPorts() {
        return ports;
    }

    public void setPorts(Set<DockerContainerPort> ports) {
        this.ports = ports;
    }

    public Set<DockerContainerEnvironment> getEnvs() {
        return envs;
    }

    public void setEnvs(Set<DockerContainerEnvironment> envs) {
        this.envs = envs;
    }
}
