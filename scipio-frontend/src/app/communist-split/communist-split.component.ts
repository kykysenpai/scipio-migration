import {Component, OnInit} from '@angular/core';
import {CommunistSplitService} from "../api/communist-split/communist-split.service";
import {CommunistSplitGroup} from "../model/communist-split/communist-split-group";
import {KeycloakService} from "../keycloak/keycloak.service";

@Component({
  selector: 'app-communist-split',
  templateUrl: './communist-split.component.html',
  styleUrls: ['./communist-split.component.css']
})
export class CommunistSplitComponent implements OnInit {

  groups: CommunistSplitGroup[];
  group: CommunistSplitGroup;

  constructor(private communistSplitService: CommunistSplitService, public keycloak: KeycloakService) {
  }

  ngOnInit() {
    this.communistSplitService.getAllGroups().subscribe((groups) => {
      this.groups = groups;
      if(this.groups.length > 0){
        this.group = this.groups[0];
      }
    });
  }

  updateGroups() {
    this.communistSplitService.getAllGroups();
  }


}
