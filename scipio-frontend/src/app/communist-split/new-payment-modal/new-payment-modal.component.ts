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

  fileData: File;
  // previewUrl: any;
  fileUploadProgress: string;
  uploadedFilePath: string;


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
    let leftAmount = this.amountLeftPipePipe.transform(this.newPayment.splitPaymentUsers, this.newPayment.amount);
    return leftAmount > -0.05 && leftAmount < 0.05;
  }

  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
  }

  preview() {
    let mime = this.fileData.type;
    if (mime.match(/image\/*/) == null) {
      return;
    }
    let reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (event) => {
      this.newPayment.image = reader.result;
    }
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
        // if (user.keycloakId != this.currentUser.keycloakId) {
        this.checkedUsers = this.checkedUsers.concat({
          user: user,
          selected: this.forEveryone
        })
        // }
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
    this.newPayment.payer = payer;
  }

  resetNewPayment() {
    this.newPayment = {
      image: null,
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
