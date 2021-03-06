import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {SpotifyService} from "../../api/spotify.service";
import {AlbumReleaseSubscription} from "../../model/spotify/album-release-subscription";
import {Observable} from "rxjs";
import {debounceTime, distinctUntilChanged, map} from "rxjs/operators";
import {KeycloakService} from "../../keycloak/keycloak.service";
import {ArtistSearch} from "../../model/spotify/artist-search";
import {MdbTableDirective, MdbTablePaginationComponent} from "angular-bootstrap-md";

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit, AfterViewInit {

  @ViewChild(MdbTablePaginationComponent, {static: true}) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, {static: true}) mdbTable: MdbTableDirective;

  constructor(private spotifyService: SpotifyService, private keycloakService: KeycloakService, private cdRef: ChangeDetectorRef) {
    this.keycloak = keycloakService;
  }

  keycloak: KeycloakService;
  foundArtists: ArtistSearch[] = [];
  subscriptions: AlbumReleaseSubscription[] = [];
  previous: AlbumReleaseSubscription[] = [];
  searchText: ArtistSearch;

  search = (text: Observable<string>) => text.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    map(term => term.length < 2 ? [] : this.foundArtists.filter(foundArtist => foundArtist.name.toLowerCase().indexOf(term.toLowerCase()) > -1)));

  ngOnInit() {
    this.updateSubscriptions();
  }

  updateSubscriptions() {
    this.spotifyService.getAllSubscriptions().subscribe(subscriptions => {
      this.subscriptions = subscriptions;
      this.mdbTable.setDataSource(this.subscriptions);
      this.subscriptions = this.mdbTable.getDataSource();
      this.previous = this.mdbTable.getDataSource();

    });
  }

  updateFoundUsers(query: string) {
    this.spotifyService.searchArtists(query).subscribe(foundArtists => this.foundArtists = foundArtists);
  }

  clickCheckbox(event, id: number) {
    if (event.currentTarget.checked) {
      this.spotifyService.subscribeForNotifications(id).subscribe(() => {
      });
    } else {
      this.spotifyService.unsubscribeFromNotifications(id).subscribe(() => {
      });
    }
  }

  artistFormatter = (artist: ArtistSearch) => artist.name;

  createSubscription() {
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

  ngAfterViewInit(): void {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(5);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

}
