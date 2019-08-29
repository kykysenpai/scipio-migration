import {Component, Input, OnInit} from '@angular/core';
import {DockerService} from "../../api/docker/docker.service";
import {RxStompService} from "@stomp/ng2-stompjs";
import {DockerContainer} from "../../model/docker/docker-container";
import {interval} from "rxjs/internal/observable/interval";

@Component({
  selector: 'app-interactable-docker-container',
  templateUrl: './interactable-docker-container.component.html',
  styleUrls: ['./interactable-docker-container.component.scss']
})
export class InteractableDockerContainerComponent implements OnInit {

  @Input() savedContainer: DockerContainer;

  state: string;

  constructor(private dockerService: DockerService, private stompService: RxStompService) {
  }

  ngOnInit() {
    this.log();
    this.readContainerState();
    this.readPullImage();
    this.getContainerState();
    interval(10000).subscribe(() => this.getContainerState());
  }

  getContainerState() {
    this.stompService.publish({
      destination: "/docker/state/" + this.savedContainer.alias
    });
  }

  log(){
    this.stompService.watch("/docker/logs/" + this.savedContainer.alias).subscribe(logLine => {
      console.log(logLine.body);
    });
  }

  pullImage() {
    this.stompService.publish({
      destination: "/docker/pull",
      body: JSON.stringify(this.savedContainer)
    })
  }

  startContainer() {
    this.stompService.publish({
      destination: "/docker/start",
      body: JSON.stringify(this.savedContainer)
    });
  }

  stopContainer() {
    this.stompService.publish({
      destination: "/docker/stop",
      body: JSON.stringify(this.savedContainer)
    });
  }

  removeContainer() {
    this.stompService.publish({
      destination: "/docker/remove",
      body: JSON.stringify(this.savedContainer)
    });
  }

  createContainer() {
    this.stompService.publish({
      destination: "/docker/create",
      body: JSON.stringify(this.savedContainer)
    });
  }

  readPullImage() {
    this.stompService.watch("/docker/pull/" + this.savedContainer.alias).subscribe(success => {
      if (JSON.parse(success.body)) {
        console.log("success pull");
      } else {
        console.log("error pull");
      }
    })
  }

  readContainerState() {
    this.stompService.watch("/docker/state/" + this.savedContainer.alias).subscribe(state => {
      if (state.body) {
        if (this.state !== state.body) {
          this.state = state.body;
        }
      } else {
        this.state = "not created";
      }
    })

  }

}
