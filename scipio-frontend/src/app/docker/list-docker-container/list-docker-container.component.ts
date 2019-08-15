import {Component, OnInit} from '@angular/core';
import {DockerService} from "../../api/docker/docker.service";
import {DockerContainer} from "../../model/docker/docker-container";

@Component({
  selector: 'app-list-docker-container',
  templateUrl: './list-docker-container.component.html',
  styleUrls: ['./list-docker-container.component.scss']
})
export class ListDockerContainerComponent implements OnInit {

  savedDockerContainers: DockerContainer[] = [];

  constructor(private dockerService: DockerService) {
  }

  ngOnInit() {
    this.updateAllSavedContainers();
  }

  updateAllSavedContainers() {
    this.dockerService.getAllSavedContainers().subscribe((containers) => {
      this.savedDockerContainers = containers;
    });
  }

}
