import {AlbumReleaseArtist} from "./album-release-artist";

export class AlbumRelease {
  id: number;
  releaseDate: Date;
  name: string;
  link: string;
  imageLink: string;
  albumReleaseArtists: AlbumReleaseArtist[];
}
