import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '@environment';
import { Playlist, SpotifyPlaylists } from '@t';

@Injectable()
export class PlaylistService {
  constructor(private http: HttpClient) {}

  getPlaylists() {
    const url = `${environment.apiUrl}/playlists`;
    return this.http.get(url).toPromise() as Promise<{ playlists: Playlist[]; spotifyPlaylists: SpotifyPlaylists }>;
  }

  importPlaylist(playlist: Playlist) {
    const url = `${environment.apiUrl}/playlists/import`;
    return this.http.post(url, { playlistId: playlist.id }).toPromise();
  }
}
