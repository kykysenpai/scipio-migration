import {Component, Input, OnInit} from '@angular/core';
import {DockerContainer} from "../../model/docker/docker-container";
import {ActivatedRoute} from "@angular/router";
import {DockerService} from "../../api/docker/docker.service";
import {RxStompService} from "@stomp/ng2-stompjs";
import {NgxSpinnerService} from "ngx-spinner";
import {interval} from "rxjs";

@Component({
  selector: 'app-details-running-docker-container',
  templateUrl: './details-running-docker-container.component.html',
  styleUrls: ['./details-running-docker-container.component.scss']
})
export class DetailsRunningDockerContainerComponent implements OnInit {

  savedDockerContainer: DockerContainer;

  state: string;

  running: boolean;

  autoscroll: boolean = true;

  logs: string[] = [];

  constructor(private route: ActivatedRoute, private dockerService: DockerService, private stompService: RxStompService, private spinner: NgxSpinnerService) {
  }


  getContainerState() {
    this.stompService.publish({
      destination: "/docker/state/" + this.savedDockerContainer.alias
    });
  }

  startContainer(){
    this.stompService.publish({
      destination: "/docker/start",
      body: JSON.stringify(this.savedDockerContainer)
    });
    this.stompService.watch("/docker/start/" + this.savedDockerContainer.alias).subscribe(progress => {

    });
    this.spinner.show();
  }

  ngOnInit() {
    interval(10000).subscribe(() => this.getContainerState());
    this.route.params.subscribe(params => {
      let alias: string = params['alias'];
      if (alias) {
        this.updateContainer(alias);
      }
    });
  }

  updateContainer(alias: string) {
    this.dockerService.getSavedContainer(alias).subscribe(container => {
      this.savedDockerContainer = container;
      this.readContainerState();
      this.log();
    })
  }

  readContainerState() {
    this.stompService.watch("/docker/state/" + this.savedDockerContainer.alias).subscribe(state => {
      if (state.body) {
        console.log("Comparing : " + state.body + " - " + this.state);
        if (this.state !== state.body) {
          console.log("changed from " + this.state + " to " + state.body);
          this.state = state.body;
        }
      } else {
        this.state = "not created";
      }
    })
  }

  log(){
    this.logs = ['Connecting to logs...'];
    this.stompService.watch("/docker/logs/" + this.savedDockerContainer.alias).subscribe(logLine => {
      this.logs.push(logLine.body);
    });
  }

}
