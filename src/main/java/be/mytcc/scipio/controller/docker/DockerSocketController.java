package be.mytcc.scipio.controller.docker;

import be.mytcc.scipio.docker.Docker;
import be.mytcc.scipio.model.docker.DockerContainer;
import be.mytcc.scipio.model.docker.DockerContainerRepository;
import com.github.dockerjava.api.model.Container;
import com.github.dockerjava.core.command.PullImageResultCallback;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.Arrays;
import java.util.List;

@Controller
public class DockerSocketController {

    private Logger logger = LoggerFactory.getLogger(DockerSocketController.class);

    @Autowired
    Docker docker;

    @Autowired
    private DockerContainerRepository dockerContainerRepository;

    @Autowired
    private SimpMessagingTemplate template;

    @MessageMapping("/docker/state/{containerName}")
    public void getState(@DestinationVariable String containerName) {
        Container container = docker.getContainersByName(containerName);
        template.convertAndSend("/docker/state/" + containerName, container == null ? "" : container.getState());
    }

    @MessageMapping("/docker/create")
    public void create(DockerContainer savedDockerContainer) {
        docker.create(savedDockerContainer);
    }

    @MessageMapping("/docker/stop")
    public void stop(DockerContainer savedDockerContainer) {
        boolean success = docker.stop(savedDockerContainer);
        template.convertAndSend("/docker/stop/" + savedDockerContainer.getAlias(), success);
    }

    @MessageMapping("/docker/start")
    public void start(DockerContainer savedDockerContainer) {
        boolean success = docker.start(savedDockerContainer, template);
        template.convertAndSend("/docker/start/" + savedDockerContainer.getAlias(), success);
    }

    @MessageMapping("/docker/currentLogs")
    public void currentLogs(DockerContainer savedDockerContainer){
        docker.getCurrentLogs(savedDockerContainer, template);
    }

    @MessageMapping("/docker/remove")
    public void remove(DockerContainer savedDockerContainer) {
        docker.remove(savedDockerContainer);
    }

    @MessageMapping("/docker/pull")
    public void pull(DockerContainer savedDockerContainer) {
        try {
            PullImageResultCallback res = docker.pull(savedDockerContainer);
            res.awaitCompletion();
            template.convertAndSend("/docker/pull/" + savedDockerContainer.getAlias(), true);
        } catch (Exception ex) {
            logger.error("Error while pulling image", ex);
            template.convertAndSend("/docker/pull/" + savedDockerContainer.getAlias(), false);
        }
    }

}

