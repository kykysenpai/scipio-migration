import {Component, OnInit} from '@angular/core';
import {CommunistSplitService} from "../api/communist-split/communist-split.service";
import {CommunistSplitGroup} from "../model/communist-split/communist-split-group";
import {KeycloakService} from "../keycloak/keycloak.service";
import {CommunistSplitPayment} from "../model/communist-split/communist-split-payment";

@Component({
  selector: 'app-communist-split',
  templateUrl: './communist-split.component.html',
  styleUrls: ['./communist-split.component.css']
})
export class CommunistSplitComponent implements OnInit {

  groups: CommunistSplitGroup[];
  group: CommunistSplitGroup;
  payments: CommunistSplitPayment[];

  constructor(private communistSplitService: CommunistSplitService, public keycloak: KeycloakService) {
  }

  ngOnInit() {
    this.updateGroups();
  }

  updateGroups() {
    this.communistSplitService.getAllGroups().subscribe((groups) => {
      this.groups = groups;
      if(this.groups.length > 0){
        this.group = this.groups[0];
      }
    });
  }

  paymentsChange(payments: CommunistSplitPayment[]){
    this.payments = payments;
  }


}
