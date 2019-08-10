import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-payment-credit',
  templateUrl: './payment-credit.component.html',
  styleUrls: ['./payment-credit.component.scss']
})
export class PaymentCreditComponent implements OnInit {

  @Input() credit: number;

  constructor() { }

  ngOnInit() {
  }

  getTextForAmount(amount: number) {
    if (amount < 0) {
      return amount + " €";
    } else if (amount == 0) {
      return "You didn't participate";
    } else {
      return "+" + amount + " €";
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

}
