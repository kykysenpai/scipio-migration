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

  private groups: CommunistSplitGroup[];
  private group: CommunistSplitGroup;

  constructor(private communistSplitService: CommunistSplitService, private keycloak: KeycloakService) {
  }

  ngOnInit() {
    this.communistSplitService.getAllGroups().subscribe((groups) => {
      this.groups = groups;
    });
  }

  updateGroups() {
    this.communistSplitService.getAllGroups();
  }


}
