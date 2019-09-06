import {CommunistSplitPaymentUser} from "./communist-split-payment-user";
import {CommunistSplitGroup} from "./communist-split-group";
import {User} from "../user";

export interface CommunistSplitPayment {
  id: number;
  createdDate: Date;
  title: string;
  description: string;
  amount: number;
  payer: User;
  lastModifiedDate: Date;
  splitPaymentUsers: CommunistSplitPaymentUser[];
  splitGroup: CommunistSplitGroup;
  image: any;
}
