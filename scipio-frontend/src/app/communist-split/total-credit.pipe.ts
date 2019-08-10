import {Pipe, PipeTransform} from '@angular/core';
import {CommunistSplitPayment} from "../model/communist-split/communist-split-payment";
import {User} from "../model/user";
import {CommunistSplitPaymentUser} from "../model/communist-split/communist-split-payment-user";

@Pipe({
  name: 'totalCredit'
})
export class TotalCreditPipe implements PipeTransform {

  transform(payments: CommunistSplitPayment[], user: User): number {
    let total = 0;
    if (payments) {
      payments.forEach(payment => {
        let isPayer = payment.payer.keycloakId == user.keycloakId;
        let currentUserParticipation: CommunistSplitPaymentUser = payment.splitPaymentUsers.find(participation => {
          return participation.user.keycloakId == user.keycloakId;
        });

        if (isPayer) {
          total = +(total + payment.amount).toFixed(2);
        }

        if (currentUserParticipation) {
          total = +(total - currentUserParticipation.owes).toFixed(2);
        }
      });
    }
    return total;
  }

}
