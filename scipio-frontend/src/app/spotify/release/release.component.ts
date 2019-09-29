import { Component, OnInit } from '@angular/core';
import {SpotifyService} from "../../api/spotify.service";
import {AlbumRelease} from "../../model/spotify/album-release";

@Component({
  selector: 'app-release',
  templateUrl: './release.component.html',
  styleUrls: ['./release.component.scss']
})
export class ReleaseComponent implements OnInit {

  constructor(private spotify: SpotifyService) { }

  releases: AlbumRelease[] = [];

  ngOnInit() {
    this.updateAllReleases();
  }

  updateAllReleases(){
    this.spotify.getAllReleases().subscribe(releases => this.releases = releases);
  }

}
