import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../model/user";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {
  }

  getUser(keycloakId: string): Observable<User> {
    return this.http.get<User>(environment.apiBaseUrl + "/api/users/" + keycloakId);
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(environment.apiBaseUrl + "/api/users/profile");
  }
}
