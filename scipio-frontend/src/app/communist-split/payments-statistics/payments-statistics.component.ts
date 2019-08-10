import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CommunistSplitGroup} from "../../model/communist-split/communist-split-group";
import {User} from "../../model/user";
import {CommunistSplitService} from "../../api/communist-split/communist-split.service";
import {UsersService} from "../../api/users.service";
import {CommunistSplitPayment} from "../../model/communist-split/communist-split-payment";

@Component({
  selector: 'app-payments-statistics',
  templateUrl: './payments-statistics.component.html',
  styleUrls: ['./payments-statistics.component.scss']
})
export class PaymentsStatisticsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private communistSplitService: CommunistSplitService, private usersService: UsersService) { }

  private user: User;
  private group: CommunistSplitGroup;
  private payments: CommunistSplitPayment[];

  ngOnInit() {
    this.route.params.subscribe(params => {
      let groupId: string = params['group-id'];
      let userId: string = params['user-id'];
      this.updateGroup(groupId);
      this.updateUser(userId);
    });
  }

  updateUser(userId: string){
    this.usersService.getUser(userId).subscribe(user => {
      this.user = user;
    })
  }

  updateGroup(groupId: string){
    this.communistSplitService.getGroup(groupId).subscribe(group => {
      this.group = group;
      this.communistSplitService.getAllPaymentsForGroup(group).subscribe(payments => {
        this.payments = payments;
        this.getGraphData();
      })
    })
  }

  getGraphData(){

  }



}
