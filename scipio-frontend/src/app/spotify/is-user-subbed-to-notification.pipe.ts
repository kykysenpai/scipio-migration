import {Pipe, PipeTransform} from '@angular/core';
import {AlbumReleaseSubscription} from "../model/spotify/album-release-subscription";

@Pipe({
  name: 'isUserSubbedToNotification'
})
export class IsUserSubbedToNotificationPipe implements PipeTransform {

  transform(subscription: AlbumReleaseSubscription, currentUserId: string): boolean {
    for (let userToNotify of subscription.usersToNotify) {
      if (userToNotify.keycloakId == currentUserId) {
        return true;
      }
    }
    return false;
  }

}
