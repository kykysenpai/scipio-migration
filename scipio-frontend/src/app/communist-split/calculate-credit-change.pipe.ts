import {Pipe, PipeTransform} from '@angular/core';
import {CommunistSplitPayment} from "../model/communist-split/communist-split-payment";
import {User} from "../model/user";
import {CommunistSplitPaymentUser} from "../model/communist-split/communist-split-payment-user";

@Pipe({
  name: 'calculateCreditChange'
})
export class CalculateCreditChangePipe implements PipeTransform {

  transform(payment: CommunistSplitPayment, currentUser: User): number {
    if (payment.payer.keycloakId == currentUser.keycloakId) {
      return payment.amount;
    } else {
      let paymentUser: CommunistSplitPaymentUser = payment.splitPaymentUsers.find(payment => {
        return payment.user.keycloakId == currentUser.keycloakId;
      });
      if (paymentUser) {
        return -paymentUser.owes;
      } else {
        return 0;
      }
    }
  }
}
