import {Component, Input, OnInit} from '@angular/core';
import {CommunistSplitPayment} from "../../model/communist-split/communist-split-payment";
import {ActivatedRoute} from "@angular/router";
import {CommunistSplitService} from "../../api/communist-split/communist-split.service";
import {Lightbox} from "ngx-lightbox";

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.scss']
})
export class PaymentDetailsComponent implements OnInit {

  @Input()
  payment: CommunistSplitPayment;

  @Input()
  inModal: boolean = false;

  constructor(private route: ActivatedRoute, private communistSplitService: CommunistSplitService, private lightbox: Lightbox) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let id: number = +params['id'];
      if (id) {
        this.updatePayment(id);
      }
    });
  }

  updatePayment(id: number) {
    this.communistSplitService.getPayment(id).subscribe(payment => {
      this.payment = payment;
    })
  }

  openImage(){
    this.lightbox.open([
      {
        caption: 'Payment\'s image',
        src: this.payment.image,
        thumb: ''
      }
    ], 0);
  }

}
