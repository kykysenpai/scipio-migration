import {User} from "../user";

export interface CommunistSplitGroup {
  id: number;
  createdDate: Date;
  name: string;
  users: User[];
  discordGuildId: string;
  discordDefaultChannelId: string;
}
