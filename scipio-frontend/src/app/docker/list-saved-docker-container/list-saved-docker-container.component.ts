import {Component, OnInit} from '@angular/core';
import {DockerService} from "../../api/docker/docker.service";
import {DockerContainer} from "../../model/docker/docker-container";
import {MDBModalRef, MDBModalService} from "angular-bootstrap-md";
import {DetailsSavedDockerContainerComponent} from "../details-saved-docker-container/details-saved-docker-container.component";

@Component({
  selector: 'app-list-saved-docker-container',
  templateUrl: './list-saved-docker-container.component.html',
  styleUrls: ['./list-saved-docker-container.component.scss']
})
export class ListSavedDockerContainerComponent implements OnInit {

  constructor(private dockerService: DockerService, private modalService: MDBModalService) {
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

  openDetails(container: DockerContainer) {
    let modalRef: MDBModalRef = this.modalService.show(DetailsSavedDockerContainerComponent, {
      data: {
        container: container
      }
    });

    modalRef.content.action.subscribe(() => {
      this.updateSavedContainers();
    })
  }

  deleteSavedContainer(container: DockerContainer){
    this.dockerService.deleteContainer(container).subscribe(() => {
      console.log("deleted");
      this.updateSavedContainers();
    });
  }

  createNew() {
    let container: DockerContainer = {
      image: null,
      alias: null,
      cmd: null,
      entrypoint: null,
      envs: null,
      id: null,
      ports: null,
      stdinOpen: null,
      volumes: null,
      workingDir: null
    };

    this.openDetails(container);

  }

}
