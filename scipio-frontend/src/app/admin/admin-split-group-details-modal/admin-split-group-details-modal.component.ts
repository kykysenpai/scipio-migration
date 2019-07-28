import {Component, OnInit} from '@angular/core';
import {MDBModalRef} from "angular-bootstrap-md";
import {CommunistSplitGroup} from "../../model/communist-split/communist-split-group";
import {AdminService} from "../../api/admin.service";
import {User} from "../../model/user";

@Component({
  selector: 'app-admin-split-group-details-modal',
  templateUrl: './admin-split-group-details-modal.component.html',
  styleUrls: ['./admin-split-group-details-modal.component.scss']
})
export class AdminSplitGroupDetailsModalComponent implements OnInit {

  group: CommunistSplitGroup;

  users: User[];

  selectedUser: User;

  constructor(public modalRef: MDBModalRef, private adminService: AdminService) {
  }

  ngOnInit() {
    this.updateUsers();
  }

  patchGroup() {
    this.group.users.push(this.selectedUser);
    this.adminService.patchCommunistSplitGroup(this.group).subscribe(group => {
      console.log("Updated : " + this.group);
    });
  }

  updateUsers() {
    this.adminService.getAllUsers().subscribe(users => {
      this.users = users;
    })
  }

}
