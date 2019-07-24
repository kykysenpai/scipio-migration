import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {CommunistSplitGroup} from "../model/communist-split-group";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommunistSplitService {

  constructor(private http: HttpClient) {
  }

  getAllGroups(): Observable<CommunistSplitGroup[]> {
    return this.http.get<CommunistSplitGroup[]>("http://localhost:8090/api/communist-split/groups");
  }
}
