import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../model/user";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {CommunistSplitGroup} from "../model/communist-split/communist-split-group";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]>{
    return this.http.get<User[]>(environment.apiBaseUrl + "/api/admin/users");
  }

  patchUser(user: User): Observable<User>{
    return this.http.patch<User>(environment.apiBaseUrl + "/api/admin/users", user);
  }

  getAllCommunistSplitGroup(): Observable<CommunistSplitGroup[]>{
    return this.http.get<CommunistSplitGroup[]>(environment.apiBaseUrl + "/api/admin//communist-split/groups");
  }

  createCommunistSplitGroup(group: CommunistSplitGroup): Observable<CommunistSplitGroup>{
    return this.http.post<CommunistSplitGroup>(environment.apiBaseUrl + "/api/admin/communist-split/groups", group);
  }

  patchCommunistSplitGroup(group: CommunistSplitGroup): Observable<CommunistSplitGroup>{
    return this.http.patch<CommunistSplitGroup>(environment.apiBaseUrl + "/api/admin/communist-split/groups", group);
  }
}
