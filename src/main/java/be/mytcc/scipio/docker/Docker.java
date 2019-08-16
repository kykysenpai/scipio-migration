package be.mytcc.scipio.docker;

import be.mytcc.scipio.model.docker.DockerContainer;
import com.github.dockerjava.api.DockerClient;
import com.github.dockerjava.api.command.CreateContainerCmd;
import com.github.dockerjava.api.command.CreateContainerResponse;
import com.github.dockerjava.api.command.PullImageCmd;
import com.github.dockerjava.api.model.*;
import com.github.dockerjava.core.command.LogContainerResultCallback;
import com.github.dockerjava.core.command.PullImageResultCallback;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
public class Docker {

    @Autowired
    private DockerClient dockerClient;

    @Value("${docker.network}")
    private String dockerNetwork;

    private Logger logger = LoggerFactory.getLogger(Docker.class);

    @PostConstruct
    public void initNetwork() {
        List<Network> networks = dockerClient.listNetworksCmd().withNameFilter(dockerNetwork).exec();
        if(networks.isEmpty()){
            dockerClient.createNetworkCmd().withName(dockerNetwork).exec();
        }
    }

    //just fucking around to test library api
    public void getRunningInstances() {
        LogContainerResultCallback resultCallback = new LogContainerResultCallback();
        //override method onNext of resultcallback
        dockerClient.logContainerCmd("id").exec(resultCallback);
    }

    public PullImageResultCallback pull(DockerContainer savedDockerContainer) {
        PullImageResultCallback res = new PullImageResultCallback();
        PullImageCmd req = dockerClient.pullImageCmd(savedDockerContainer.getImage());
        if (savedDockerContainer.getTag() != null) {
            req.withTag(savedDockerContainer.getTag());
        }
        return req.exec(res);
    }

    public void start(DockerContainer savedDockerContainer) {
        Container container = getContainersByName(savedDockerContainer);
        if (container != null) {
            dockerClient.startContainerCmd(container.getId()).exec();
        }
    }

    public void remove(DockerContainer savedDockerContainer) {
        Container container = getContainersByName(savedDockerContainer);
        if (container != null) {
            dockerClient.removeContainerCmd(container.getId()).exec();
        }
    }

    public void stop(DockerContainer savedDockerContainer) {
        Container container = getContainersByName(savedDockerContainer);
        if (container != null) {
            dockerClient.stopContainerCmd(container.getId()).exec();
        }
    }

    private Container getContainersByName(DockerContainer dockerContainer) {
        List<Container> containers =  dockerClient.listContainersCmd().withShowAll(true).withNameFilter(Arrays.asList(dockerContainer.getAlias())).exec();
        return containers.stream().filter(container -> {
            for (String name : container.getNames()) {
                if(name.equals("/" + dockerContainer.getAlias())) return true;
            }
            return false;
        }).findFirst().orElse(null);
    }

    public void create(DockerContainer savedDockerContainer) {
        Container container = getContainersByName(savedDockerContainer);
        if (container == null) { //currently not created

            String imageWithTag = savedDockerContainer.getImage();
            if (savedDockerContainer.getTag() != null) {
                imageWithTag += ":" + savedDockerContainer.getTag();
            }

            CreateContainerCmd cmd = dockerClient.createContainerCmd(imageWithTag)
                    .withAliases(savedDockerContainer.getAlias())
                    .withName(savedDockerContainer.getAlias());

            configureContainer(cmd, savedDockerContainer);
        }
    }

    public List<Container> getStatus(List<String> names) {
        return dockerClient.listContainersCmd().withNameFilter(names).withShowAll(true).exec();
    }

    private CreateContainerResponse configureContainer(CreateContainerCmd cmd, DockerContainer container) {

        HostConfig hostConfig = HostConfig
                .newHostConfig()
                .withRestartPolicy(RestartPolicy.alwaysRestart())
                .withNetworkMode(dockerNetwork);

        if (container.getVolumes() != null) {
            hostConfig.withBinds(parseVolumes(container.getVolumes()));
        }

        if (container.getPorts() != null) {
            hostConfig.withPortBindings(parsePorts(container.getPorts()));
        }

        cmd.withHostConfig(hostConfig);

        if (container.getEnvs() != null) {
            cmd.withEnv(parseEnvs(container.getEnvs()));
        }

        if (container.getEntrypoint() != null) {
            cmd.withEntrypoint(container.getEntrypoint());
        }

        if (container.getWorkingDir() != null) {
            cmd.withWorkingDir(container.getWorkingDir());
        }

        if (container.getCmd() != null) {
            cmd.withCmd(container.getCmd());
        }

        if (container.getStdinOpen() != null) {
            cmd.withStdinOpen(Boolean.parseBoolean(container.getStdinOpen()));
        }

        return cmd.exec();
    }

    private List<String> parseEnvs(String envVars) {
        return new ArrayList<>(Arrays.asList(envVars.split(",")));
    }

    private List<PortBinding> parsePorts(String ports){
        List<PortBinding> portBindings = new ArrayList<>();
        for (String portBind : ports.split(",")) {
            portBindings.add(PortBinding.parse(portBind));
        }
        return portBindings;
    }

    private List<Bind> parseVolumes(String volumes){
        List<Bind> binds = new ArrayList<>();
        for (String volumeBind : volumes.split("\n")) {
            binds.add(Bind.parse(volumeBind));
        }
        return binds;
    }
}
