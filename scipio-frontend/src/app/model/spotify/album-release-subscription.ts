import {User} from "../user";

export class AlbumReleaseSubscription {
  id: number;
  artistName: string;
  artistId: string;
  creator: User;
  usersToNotify: User[];
}
