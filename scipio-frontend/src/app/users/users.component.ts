import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UsersService} from "../api/users.service";
import {User} from "../model/user";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  user: User;

  constructor(private route: ActivatedRoute, private usersService: UsersService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let id: string = params['id'];
      this.updateUser(id);
    });
  }

  updateUser(keycloakId: string){
    this.usersService.getUser(keycloakId).subscribe((user) => {
      this.user = user;
    })
  }

}
