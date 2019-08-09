import {Component, Input, OnInit} from '@angular/core';
import {CommunistSplitGroup} from "../../model/communist-split/communist-split-group";
import {CommunistSplitService} from "../../api/communist-split/communist-split.service";
import {CommunistSplitPayment} from "../../model/communist-split/communist-split-payment";
import {MDBModalService} from "angular-bootstrap-md";
import {NewPaymentModalComponent} from "../new-payment-modal/new-payment-modal.component";
import {PaymentDetailsModalComponent} from "../payment-details-modal/payment-details-modal.component";
import {User} from "../../model/user";
import {Observable} from "rxjs";
import {UsersService} from "../../api/users.service";

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  @Input() currentGroup: CommunistSplitGroup;

  payments: CommunistSplitPayment[];

  currentUser: Observable<User>;

  constructor(private communistSplitService: CommunistSplitService, private modalService: MDBModalService, private usersService: UsersService) {
  }

  ngOnInit() {
    this.updateAllPayments();
    this.currentUser = this.usersService.getCurrentUser();
  }

  getTextForAmount(amount: number) {
    if (amount < 0) {
      return "- " + amount;
    } else if (amount == 0) {
      return "N/A";
    } else {
      return "+ " + amount;
    }
  }

  getClassForAmount(amount: number) {
    if (amount < 0) {
      return 'red';
    } else if (amount == 0) {
      return 'blue';
    } else {
      return 'green';
    }
  }

  updateAllPayments() {
    this.communistSplitService.getAllPaymentsForGroup(this.currentGroup).subscribe(payments => {
      this.payments = payments
    });
  }

  showPaymentCreationModal() {
    let modalRef = this.modalService.show(NewPaymentModalComponent, {
      class: "modal-lg",
      containerClass: "overflow-modal",
      data: {
        group: this.currentGroup
      }
    });

    modalRef.content.action.subscribe(() => {
      this.updateAllPayments();
    })
  }

  openDetails(payment: CommunistSplitPayment) {
    this.modalService.show(PaymentDetailsModalComponent, {
      data: {
        payment: payment
      }
    })
  }

}
