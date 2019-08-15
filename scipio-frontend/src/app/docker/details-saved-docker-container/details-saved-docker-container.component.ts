import {Component, OnInit} from '@angular/core';
import {MDBModalRef} from "angular-bootstrap-md";
import {DockerContainer} from "../../model/docker/docker-container";
import {DockerService} from "../../api/docker/docker.service";
import {Subject} from "rxjs";

@Component({
  selector: 'app-details-saved-docker-container',
  templateUrl: './details-saved-docker-container.component.html',
  styleUrls: ['./details-saved-docker-container.component.scss']
})
export class DetailsSavedDockerContainerComponent implements OnInit {

  container: DockerContainer;

  action: Subject<any> = new Subject<any>();

  portsMappingsRegexp: RegExp = RegExp("^[0-9]+:[0-9]+(,[0-9]+:[0-9]+)*$");
  volumesMappingsRegexp: RegExp = RegExp("^[a-zA-Z0-9_\\-./]+:[a-zA-Z0-9_\\-./]+(,[a-zA-Z0-9_\\-./]+:[a-zA-Z0-9_\\-./]+)*$");
  envsMappingsRegexp: RegExp = RegExp("^[a-zA-Z0-9_\\-.]+=[a-zA-Z0-9_\\-.]+(,[a-zA-Z0-9_\\-.]+=[a-zA-Z0-9_\\-.]+)*$");

  constructor(public modalRef: MDBModalRef, private dockerService: DockerService) {
  }

  ngOnInit() {
  }

  isValid(): boolean {
    return this.isValidAlias() && this.isValidImage() && this.isValidPorts() && this.isValidVolumes() && this.isValidEnvironmentVars()
  }

  isValidAlias(): boolean {
    return !!this.container.alias;
  }

  isValidImage(): boolean {
    return !!this.container.image;
  }

  isEntireStringValidWithRegex(value: string, regex: RegExp): boolean{
    let matches: RegExpMatchArray = value.match(regex);

    if(matches){
      return matches[0].length == value.length;
    }

    return false;
  }

  isValidEnvironmentVars(){
    if(!this.container.envs){
      return true;
    }

    return this.isEntireStringValidWithRegex(this.container.envs, this.envsMappingsRegexp);
  }

  isValidVolumes(): boolean {
    if(!this.container.volumes){
      return true;
    }

    return this.isEntireStringValidWithRegex(this.container.volumes, this.volumesMappingsRegexp);
  }

  isValidPorts(): boolean{
    if(!this.container.ports){
      return true;
    }

    return this.isEntireStringValidWithRegex(this.container.ports, this.portsMappingsRegexp);
  }



  createOrUpdateContainer() {
    this.dockerService.createOrUpdateContainer(this.container).subscribe((container) => {
      console.log("Create container", container);
      this.action.next();
      this.modalRef.hide();
    })
  }

}
