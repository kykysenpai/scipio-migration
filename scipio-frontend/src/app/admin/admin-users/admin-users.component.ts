import { Component, OnInit } from '@angular/core';
import {User} from "../../model/user";
import {AdminService} from "../../api/admin.service";

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {

  users: User[] = [];

  constructor(private adminService: AdminService) {
  }

  ngOnInit() {
    this.updateAllUsers();
  }

  updateAllUsers() {
    this.adminService.getAllUsers().subscribe(users => this.users = users);
  }

  patchUser(user: User) {
    this.adminService.patchUser(user).subscribe((user) => {
      console.log("updated : ", user)
    });
  }

}
