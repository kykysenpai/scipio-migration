import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CommunistSplitGroup} from "../../model/communist-split/communist-split-group";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {CommunistSplitPayment} from "../../model/communist-split/communist-split-payment";
import {User} from "../../model/user";

@Injectable({
  providedIn: 'root'
})
export class CommunistSplitService {

  constructor(private http: HttpClient) {

  }

  getAllGroups(): Observable<CommunistSplitGroup[]> {
    return this.http.get<CommunistSplitGroup[]>(environment.apiBaseUrl + "/api/communist-split/groups");
  }

  getAllPaymentsForGroup(group: CommunistSplitGroup): Observable<CommunistSplitPayment[]> {
    return this.http.get<CommunistSplitPayment[]>(environment.apiBaseUrl + "/api/communist-split/" + group.id + "/payments");
  }

  createNewPayment(payment: CommunistSplitPayment){
    return this.http.post<CommunistSplitPayment>(environment.apiBaseUrl + "/api/communist-split/payments", payment);
  }

  getUsersInGroup(group: CommunistSplitGroup): Observable<User[]>{
    return this.http.get<User[]>(environment.apiBaseUrl + "/api/communist-split/" + group.id + "/users");
  }
}
