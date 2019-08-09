import {Pipe, PipeTransform} from '@angular/core';
import {CommunistSplitPaymentUser} from "../model/communist-split/communist-split-payment-user";

@Pipe({
  name: 'amountLeftPipe',
  pure: false
})
export class AmountLeftPipePipe implements PipeTransform {

  transform(participations: CommunistSplitPaymentUser[], amount: number): number {
    let amountLeft = amount;
    participations.forEach(participation => {
      amountLeft = amountLeft - participation.owes
    });
    return amountLeft;
  }

}
