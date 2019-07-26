import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Monster} from "../../model/bdo/monster";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Hunt} from "../../model/bdo/hunt";

@Injectable({
  providedIn: 'root'
})
export class HuntService {

  constructor(private http: HttpClient) {
  }

  getAllMonsters(): Observable<Monster[]> {
    return this.http.get<Monster[]>(environment.apiBaseUrl + "/api/hunt/monsters");
  }

  patchMonster(monster: Monster): Observable<Monster> {
    return this.http.patch<Monster>(environment.apiBaseUrl + "/api/hunt/monsters", monster);
  }

  createMonster(monster: Monster): Observable<Monster> {
    return this.http.post<Monster>(environment.apiBaseUrl + "/api/hunt/monsters", monster);
  }

  deleteMonster(monster: Monster): Observable<Monster> {
    return this.http.delete<Monster>(environment.apiBaseUrl + "/api/hunt/monsters/" + monster.id);
  }

  getAllHunts(): Observable<Hunt[]> {
    return this.http.get<Hunt[]>(environment.apiBaseUrl + "/api/hunt/hunts");
  }
}
