package be.mytcc.scipio.model.docker;

import javax.persistence.*;

@Entity
public class DockerContainer {

    @Id
    @GeneratedValue
    private long id;

    @Column(name = "image")
    private String image;

    @Column(name = "tag")
    private String tag;

    @Column(name = "alias", unique = true)
    private String alias;

    @Column(name = "entrypoint")
    private String entrypoint;

    @Column(name = "working_dir")
    private String workingDir;

    @Column(name = "stdin_open")
    private String stdinOpen;

    @Column(name = "tty")
    private String tty;

    @Column(name = "cmd")
    private String cmd;

    @Column(name = "volumes")
    @Lob
    private String volumes;

    @Column(name = "ports")
    private String ports;

    @Column(name = "envs")
    private String envs;

    @Column(name = "network")
    private String network;

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

    public String getVolumes() {
        return volumes;
    }

    public void setVolumes(String volumes) {
        this.volumes = volumes;
    }

    public String getPorts() {
        return ports;
    }

    public void setPorts(String ports) {
        this.ports = ports;
    }

    public String getEnvs() {
        return envs;
    }

    public void setEnvs(String envs) {
        this.envs = envs;
    }

    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    public String getTty() {
        return tty;
    }

    public void setTty(String tty) {
        this.tty = tty;
    }

    public String getNetwork() {
        return network;
    }

    public void setNetwork(String network) {
        this.network = network;
    }
}
