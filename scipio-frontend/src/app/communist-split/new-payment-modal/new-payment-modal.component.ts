import {Component, OnInit} from '@angular/core';
import {MDBModalRef} from "angular-bootstrap-md";
import {User} from "../../model/user";
import {CommunistSplitService} from "../../api/communist-split/communist-split.service";
import {CommunistSplitGroup} from "../../model/communist-split/communist-split-group";

@Component({
  selector: 'app-new-payment-modal',
  templateUrl: './new-payment-modal.component.html',
  styleUrls: ['./new-payment-modal.component.scss']
})
export class NewPaymentModalComponent implements OnInit {

  allUsers: User[] = [];

  group: CommunistSplitGroup;

  constructor(public modalRef: MDBModalRef, private communistSplitService: CommunistSplitService) {
  }

  ngOnInit() {
    this.updateUsers();
  }

  updateUsers() {
    this.communistSplitService.getUsersInGroup(this.group).subscribe((allUsers) => {
      this.allUsers = allUsers;
    });
  }

  createNewPayment() {

  }

}
