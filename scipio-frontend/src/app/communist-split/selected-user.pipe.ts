import {Pipe, PipeTransform} from '@angular/core';
import {User} from "../model/user";

@Pipe({
  name: 'selectedUser'
})
export class SelectedUserPipe implements PipeTransform {

  transform(userArray: { user: User, selected: boolean }[]): { user: User, selected: boolean }[] {
    if (!userArray) {
      return [];
    }

    return userArray.filter((user) => {
      return user.selected;
    })
  }

}
