import { Component, OnInit } from '@angular/core';
import {DockerService} from "../../api/docker/docker.service";

@Component({
  selector: 'app-interactable-docker-container',
  templateUrl: './interactable-docker-container.component.html',
  styleUrls: ['./interactable-docker-container.component.scss']
})
export class InteractableDockerContainerComponent implements OnInit {

  constructor(private dockerService: DockerService) { }

  ngOnInit() {

  }

}
