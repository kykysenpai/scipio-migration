package be.mytcc.scipio.docker;

import com.github.dockerjava.api.DockerClient;
import com.github.dockerjava.api.model.*;
import com.github.dockerjava.core.command.LogContainerResultCallback;
import org.apache.catalina.Host;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class Docker {

    @Autowired
    private DockerClient dockerClient;

    @Value("${docker.network}")
    private String dockerNetwork;

    private Logger logger = LoggerFactory.getLogger(Docker.class);

    //just fucking around to test library api
    public void getRunningInstances(){

        Bind bind = Bind.parse("./config:/srv/config");

        PortBinding portBinding = PortBinding.parse("55:55");

        LogContainerResultCallback resultCallback = new LogContainerResultCallback();
        //override method onNext of resultcallback


        dockerClient.logContainerCmd("id").exec(resultCallback);

        //withX replaceable with lists, or array ...
        dockerClient.createContainerCmd("image")
                .withHostConfig(HostConfig.newHostConfig()
                        .withNetworkMode(dockerNetwork)
                        .withPortBindings(portBinding)
                        .withBinds(bind)
                .withRestartPolicy(RestartPolicy.alwaysRestart()))
                .withEnv("ENV=env")
                .withAliases("name")
                .withEntrypoint("entrypoint")
                .withWorkingDir("workingDir")
                .withCmd("cmd")
                .withStdinOpen(false)
                .exec();

    }
}
