import {User} from "../user";
import {CommunistSplitPayment} from "./communist-split-payment";

export interface CommunistSplitPaymentUser {
  id: number;
  owns: number;
  user: User;
  payment: CommunistSplitPayment;
}
