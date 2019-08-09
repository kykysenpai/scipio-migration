import {Component, OnInit} from '@angular/core';
import {MDBModalRef} from "angular-bootstrap-md";
import {User} from "../../model/user";
import {CommunistSplitService} from "../../api/communist-split/communist-split.service";
import {CommunistSplitGroup} from "../../model/communist-split/communist-split-group";
import {CommunistSplitPayment} from "../../model/communist-split/communist-split-payment";
import {split} from "ts-node";
import {UsersService} from "../../api/users.service";
import {Subject} from "rxjs";
import {AmountLeftPipePipe} from "../amount-left-pipe.pipe";

@Component({
  selector: 'app-new-payment-modal',
  templateUrl: './new-payment-modal.component.html',
  styleUrls: ['./new-payment-modal.component.scss']
})
export class NewPaymentModalComponent implements OnInit {

  allUsers: User[] = [];
  checkedUsers: { user: User, selected: boolean }[] = [];
  currentUser: User;
  action: Subject<any> = new Subject<any>();

  forEveryone: boolean = true;
  splittedEqually: boolean = true;

  currentStep: number = 0;
  steps: string[] = ["users", "split"];

  payerSearch: string = "";

  group: CommunistSplitGroup;

  newPayment: CommunistSplitPayment;

  constructor(public modalRef: MDBModalRef, private communistSplitService: CommunistSplitService, private usersService: UsersService, private amountLeftPipePipe: AmountLeftPipePipe) {
  }

  isValid(): boolean {
    return this.isValidAmount() && this.isValidPayer() && this.isValidTotal() && this.isValidTitle();
  }

  isValidPayer(): boolean {
    return !!this.newPayment.payer;
  }

  isValidTotal(): boolean {
    return !!this.newPayment.amount && this.newPayment.amount > 0;
  }

  isValidTitle(): boolean {
    return !!this.newPayment.title;
  }

  isValidAmount(): boolean {
    return this.amountLeftPipePipe.transform(this.newPayment.splitPaymentUsers, this.newPayment.amount) === 0;
  }

  ngOnInit() {
    this.resetNewPayment();
    this.usersService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
      this.updateAllUsers();
    });
  }

  createNewPayment() {
    this.communistSplitService.createNewPayment(this.newPayment).subscribe(payment => {
      this.action.next();
      this.resetNewPayment();
      this.modalRef.hide();
    }, err => {
      console.error(err);
    });
  }

  switchSplittedEqually() {
    this.splittedEqually = !this.splittedEqually;
    this.updateEqualSplit();
  }

  updateAmount() {
    if (this.splittedEqually) {
      this.updateEqualSplit();
    }
  }

  updateEqualSplit() {
    let split = this.newPayment.amount / this.newPayment.splitPaymentUsers.length;

    this.newPayment.splitPaymentUsers.forEach(splitPayment => {
      splitPayment.owes = split;
    })
  }

  switchForEveryone() {
    this.forEveryone = !this.forEveryone;
    this.checkedUsers.forEach(checkedUser => {
      checkedUser.selected = this.forEveryone;
    });
    this.checkedUsers = this.checkedUsers.concat();
  }

  updateAllUsers() {
    this.communistSplitService.getUsersInGroup(this.group).subscribe(allUsers => {
      this.allUsers = allUsers;
      this.newPayment.payer = this.currentUser;
      this.checkedUsers = [];
      allUsers.forEach(user => {
        if (user.keycloakId != this.currentUser.keycloakId) {
          this.checkedUsers = this.checkedUsers.concat({
            user: user,
            selected: this.forEveryone
          })
        }
      })
    });
  }

  checkUser(i: number) {
    this.checkedUsers[i].selected = !this.checkedUsers[i].selected;
    this.checkedUsers = this.checkedUsers.concat();
  }

  updateSplitPaymentParticipants() {
    this.newPayment.splitPaymentUsers = [];
    this.checkedUsers.forEach(checkedUser => {
      if (checkedUser.selected) {
        this.newPayment.splitPaymentUsers.push({
          user: checkedUser.user,
          id: null,
          owes: 0,
          payment: null
        });
      }
    });
  }

  selectPayer(payer: User) {
    if (this.newPayment.payer) {
      this.checkedUsers = this.checkedUsers.concat({
        user: this.newPayment.payer,
        selected: this.forEveryone
      });
    }
    this.newPayment.payer = payer;

    this.checkedUsers = this.checkedUsers.filter(checkedUser => {
      return checkedUser.user.username != payer.username;
    });
  }

  resetNewPayment() {
    this.newPayment = {
      title: "",
      payer: null,
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
