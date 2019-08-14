package be.mytcc.scipio.controller.docker;

import be.mytcc.scipio.docker.Docker;
import be.mytcc.scipio.model.docker.DockerContainer;
import be.mytcc.scipio.model.docker.DockerContainerRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/docker")
public class DockerController {

    private Logger logger = LoggerFactory.getLogger(DockerController.class);

    @Autowired
    private Docker docker;

    @Autowired
    private DockerContainerRepository dockerContainerRepository;

    @GetMapping("/saved-containers")
    public List<DockerContainer> getAllSavedContainers() {
        return dockerContainerRepository.findAll();
    }

    @PostMapping("/saved-containers")
    public DockerContainer createOrUpdateSavedDockerContainer(@RequestBody DockerContainer dockerContainer) {
        return dockerContainerRepository.save(dockerContainer);
    }

    @DeleteMapping("/saved-containers/{id}")
    public void deleteSavedContainer(@PathVariable("id") long id) {
        dockerContainerRepository.deleteById(id);
    }

}
