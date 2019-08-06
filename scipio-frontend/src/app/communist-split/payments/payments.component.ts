import {Component, Input, OnInit} from '@angular/core';
import {CommunistSplitGroup} from "../../model/communist-split/communist-split-group";
import {CommunistSplitService} from "../../api/communist-split/communist-split.service";
import {CommunistSplitPayment} from "../../model/communist-split/communist-split-payment";
import {MDBModalService} from "angular-bootstrap-md";
import {NewPaymentModalComponent} from "../new-payment-modal/new-payment-modal.component";
import {PaymentDetailsModalComponent} from "../payment-details-modal/payment-details-modal.component";

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  @Input() currentGroup: CommunistSplitGroup;

  payments: CommunistSplitPayment[];

  constructor(private communistSplitService: CommunistSplitService, private modalService: MDBModalService) {
  }

  ngOnInit() {
    this.updateAllPayments();
  }

  updateAllPayments() {
    this.communistSplitService.getAllPaymentsForGroup(this.currentGroup).subscribe(payments => this.payments = payments);
  }

  showPaymentCreationModal() {
    this.modalService.show(NewPaymentModalComponent, {
      class: "modal-lg",
      containerClass: "overflow-modal",
      data: {
        group: this.currentGroup
      }
    });
  }

  openDetails(payment: CommunistSplitPayment) {
    this.modalService.show(PaymentDetailsModalComponent, {
      data: {
        payment: payment
      }
    })
  }

}
