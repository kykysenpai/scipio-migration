import {User} from "../user";
import {CommunistSplitPayment} from "./communist-split-payment";

export interface CommunistSplitPaymentUser {
  id: number;
  owes: number;
  user: User;
  payment: CommunistSplitPayment;
}
