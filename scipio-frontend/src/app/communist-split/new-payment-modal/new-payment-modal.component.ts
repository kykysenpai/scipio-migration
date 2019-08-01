import {Component, OnInit} from '@angular/core';
import {MDBModalRef} from "angular-bootstrap-md";
import {User} from "../../model/user";
import {CommunistSplitService} from "../../api/communist-split/communist-split.service";
import {CommunistSplitGroup} from "../../model/communist-split/communist-split-group";
import {CommunistSplitPayment} from "../../model/communist-split/communist-split-payment";

@Component({
  selector: 'app-new-payment-modal',
  templateUrl: './new-payment-modal.component.html',
  styleUrls: ['./new-payment-modal.component.scss']
})
export class NewPaymentModalComponent implements OnInit {

  allUsers: User[] = [];

  group: CommunistSplitGroup;

  newPayment: CommunistSplitPayment;

  constructor(public modalRef: MDBModalRef, private communistSplitService: CommunistSplitService) {
  }

  ngOnInit() {
    this.resetNewPayment();
    this.updateUsers();
  }

  updateUsers() {
    this.communistSplitService.getUsersInGroup(this.group).subscribe((allUsers) => {
      this.allUsers = allUsers;
    });
  }

  createNewPayment() {
    this.communistSplitService.createNewPayment(this.newPayment);
    this.resetNewPayment();
  }

  resetNewPayment() {
    this.newPayment = {
      description: "",
      amount: 0,
      splitGroup: this.group,
      createdDate: null,
      id: null,
      lastModifiedDate: null,
      splitPaymentUsers: []
    }
  }

}
