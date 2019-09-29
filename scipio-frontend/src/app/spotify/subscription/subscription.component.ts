import {Component, OnInit} from '@angular/core';
import {SpotifyService} from "../../api/spotify.service";
import {AlbumReleaseSubscription} from "../../model/spotify/album-release-subscription";
import {Observable} from "rxjs";
import {debounceTime, distinctUntilChanged, map} from "rxjs/operators";

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {

  constructor(private spotifyService: SpotifyService) {
  }

  foundArtists: string[] = [];
  subscriptions: AlbumReleaseSubscription[] = [];
  searchText: string;

  search = (text: Observable<string>) => text.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    map(term => term.length < 2 ? [] : this.foundArtists));

  ngOnInit() {
    this.updateSubscriptions();
  }

  updateSubscriptions() {
    this.spotifyService.getAllSubscriptions().subscribe(subscriptions => this.subscriptions = subscriptions);
  }

  updateFoundUsers(query: string) {
    this.spotifyService.searchArtists(query).subscribe(foundArtists => this.foundArtists = foundArtists);
  }

  createSubscription(){
    this.spotifyService.createNewSubscription({
      artistName: this.searchText,
      id: null
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
