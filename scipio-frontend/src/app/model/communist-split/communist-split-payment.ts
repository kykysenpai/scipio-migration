import {CommunistSplitPaymentUser} from "./communist-split-payment-user";
import {CommunistSplitGroup} from "./communist-split-group";

export interface CommunistSplitPayment {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  splitPaymentUsers: CommunistSplitPaymentUser[];
  splitGroup: CommunistSplitGroup;
}
