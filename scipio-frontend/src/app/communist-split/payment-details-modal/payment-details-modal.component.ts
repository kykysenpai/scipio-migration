import { Component, OnInit } from '@angular/core';
import {CommunistSplitPayment} from "../../model/communist-split/communist-split-payment";
import {MDBModalRef} from "angular-bootstrap-md";

@Component({
  selector: 'app-payment-details-modal',
  templateUrl: './payment-details-modal.component.html',
  styleUrls: ['./payment-details-modal.component.scss']
})
export class PaymentDetailsModalComponent implements OnInit {

  payment: CommunistSplitPayment;

  constructor(public modalRef: MDBModalRef) { }

  ngOnInit() {
  }

}
