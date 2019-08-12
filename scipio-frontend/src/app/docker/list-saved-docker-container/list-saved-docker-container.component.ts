import {Component, OnInit} from '@angular/core';
import {DockerService} from "../../api/docker/docker.service";
import {DockerContainer} from "../../model/docker/docker-container";

@Component({
  selector: 'app-list-saved-docker-container',
  templateUrl: './list-saved-docker-container.component.html',
  styleUrls: ['./list-saved-docker-container.component.scss']
})
export class ListSavedDockerContainerComponent implements OnInit {

  constructor(private dockerService: DockerService) {
  }

  savedContainers: DockerContainer[] = [];

  ngOnInit() {
    this.updateSavedContainers();
  }

  updateSavedContainers() {
    this.dockerService.getAllSavedContainers().subscribe(savedContainers => {
      this.savedContainers = savedContainers;
    })
  }

}
