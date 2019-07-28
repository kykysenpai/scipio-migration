import {Component, OnInit} from '@angular/core';
import {CommunistSplitGroup} from "../../model/communist-split/communist-split-group";
import {AdminService} from "../../api/admin.service";
import {FormControl, FormGroup} from "@angular/forms";
import {AdminSplitGroupDetailsModalComponent} from "../admin-split-group-details-modal/admin-split-group-details-modal.component";
import {MDBModalRef, MDBModalService} from "angular-bootstrap-md";

@Component({
  selector: 'app-admin-communist-split',
  templateUrl: './admin-communist-split.component.html',
  styleUrls: ['./admin-communist-split.component.scss']
})
export class AdminCommunistSplitComponent implements OnInit {

  groups: CommunistSplitGroup[] = [];

  newGroupForm = new FormGroup({
    name: new FormControl(),
    discordGuildId: new FormControl(),
    discordDefaultChannelId: new FormControl()
  });

  modalRef: MDBModalRef;

  constructor(private adminService: AdminService, private modalService: MDBModalService) {
  }

  ngOnInit() {
    this.updateAllGroups();
  }

  updateAllGroups() {
    this.adminService.getAllCommunistSplitGroup().subscribe(groups => this.groups = groups);
  }

  createNewGroup() {
    let group: CommunistSplitGroup = {
      name: this.newGroupForm.get("name").value,
      createdDate: null,
      id: null,
      users: [],
      discordDefaultChannelId: this.newGroupForm.get("discordDefaultChannelId").value,
      discordGuildId: this.newGroupForm.get("discordGuildId").value
    };
    this.adminService.createCommunistSplitGroup(group).subscribe(newGroup => {
      this.updateAllGroups();
      this.newGroupForm.reset();
    })
  }

  patchGroup(group: CommunistSplitGroup){
    this.adminService.patchCommunistSplitGroup(group).subscribe(group => {
      this.updateAllGroups();
    })
  }

  openDetails(group: CommunistSplitGroup) {
    this.modalRef = this.modalService.show(AdminSplitGroupDetailsModalComponent, {
      data: {
        group: group
      }
    });
  }

}
