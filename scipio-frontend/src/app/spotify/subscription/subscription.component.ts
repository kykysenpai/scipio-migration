import {Component, OnInit} from '@angular/core';
import {SpotifyService} from "../../api/spotify.service";
import {AlbumReleaseSubscription} from "../../model/spotify/album-release-subscription";
import {Observable} from "rxjs";
import {debounceTime, distinctUntilChanged, map} from "rxjs/operators";
import {KeycloakService} from "../../keycloak/keycloak.service";
import {ArtistSearch} from "../../model/spotify/artist-search";

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {

  constructor(private spotifyService: SpotifyService, private keycloak: KeycloakService) {
  }

  foundArtists: ArtistSearch[] = [];
  subscriptions: AlbumReleaseSubscription[] = [];
  searchText: ArtistSearch;

  search = (text: Observable<string>) => text.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    map(term => term.length < 2 ? [] : this.foundArtists.filter(foundArtist => foundArtist.name.toLowerCase().indexOf(term.toLowerCase()) > -1)));

  ngOnInit() {
    this.updateSubscriptions();
  }

  updateSubscriptions() {
    this.spotifyService.getAllSubscriptions().subscribe(subscriptions => this.subscriptions = subscriptions);
  }

  updateFoundUsers(query: string) {
    this.spotifyService.searchArtists(query).subscribe(foundArtists => this.foundArtists = foundArtists);
  }

  clickCheckbox(event, id: number){
    if(event.currentTarget.checked){
      this.spotifyService.subscribeForNotifications(id).subscribe(() => {});
    } else {
      this.spotifyService.unsubscribeFromNotifications(id).subscribe(() => {});
    }
  }

  artistFormatter = (artist: ArtistSearch) => artist.name;

  createSubscription(){
    this.spotifyService.createNewSubscription({
      artistName: this.searchText.name,
      id: null,
      artistId: this.searchText.id,
      usersToNotify: [],
      creator: null
    }).subscribe(() => {
      this.updateSubscriptions();
    })
  }

  isNotValidInput(): boolean {
    return this.foundArtists.indexOf(this.searchText) <= -1;
  }

  onSearchChange(searchValue: string) {
    if (searchValue.length > 2) {
      this.updateFoundUsers(searchValue);
    } else {
      this.foundArtists = [];
    }
  }


}
