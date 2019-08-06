import {Pipe, PipeTransform} from '@angular/core';
import {User} from "../model/user";

@Pipe({
  name: 'searchUser'
})
export class SearchUserPipe implements PipeTransform {

  transform(users: User[], searchString: string): User[] {
    if (!users) {
      return [];
    }

    if (!searchString) {
      return users;
    }

    searchString = searchString.toLowerCase();

    return users.filter(user => {
      return user.username.toLowerCase().includes(searchString);
    })
  }

}
