import {Monster} from "./monster";
import {GuildMember} from "./guildMember";

export interface Hunt {
  id: number;
  monster: Monster;
  amount: number;
  guildMember: GuildMember;
  createdDate: Date;
}
