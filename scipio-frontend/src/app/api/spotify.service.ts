import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {AlbumReleaseSubscription} from "../model/spotify/album-release-subscription";
import {AlbumRelease} from "../model/spotify/album-release";

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) {
  }

  getAllSubscriptions(): Observable<AlbumReleaseSubscription[]> {
    return this.http.get<AlbumReleaseSubscription[]>(environment.apiBaseUrl + "/api/spotify/subscriptions");
  }

  createNewSubscription(sub: AlbumReleaseSubscription): Observable<AlbumReleaseSubscription> {
    return this.http.post<AlbumReleaseSubscription>(environment.apiBaseUrl + "/api/spotify/subscriptions", sub);
  }

  searchArtists(criteria: string): Observable<string[]> {
    return this.http.post<string[]>(environment.apiBaseUrl + "/api/spotify/search", criteria);
  }

  getAllReleases(): Observable<AlbumRelease[]> {
    return this.http.get<AlbumRelease[]>(environment.apiBaseUrl + "/api/spotify/releases");
  }
}
