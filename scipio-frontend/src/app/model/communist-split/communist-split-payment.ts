import {CommunistSplitPaymentUser} from "./communist-split-payment-user";
import {CommunistSplitGroup} from "./communist-split-group";

export interface CommunistSplitPayment {
  id: number;
  createdDate: Date;
  description: string;
  amount: number;
  lastModifiedDate: Date;
  splitPaymentUsers: CommunistSplitPaymentUser[];
  splitGroup: CommunistSplitGroup;
}
