import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '@environment';
import { Playlist, SpotifyPlaylists } from '@types';

@Injectable()
export class PlaylistService {
  constructor(private http: HttpClient) {}

  getPlaylists() {
    const url = `${environment.apiUrl}/playlists`;
    return this.http.get(url).toPromise() as Promise<{ playlists: Playlist[]; spotifyPlaylists: SpotifyPlaylists }>;
  }

  getImportedPlaylists() {
    const url = `${environment.apiUrl}/playlists/imported`;
    return this.http.get(url).toPromise() as Promise<{ playlists: Playlist[] }>;
  }
}
