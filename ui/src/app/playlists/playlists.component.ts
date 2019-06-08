import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { PlaylistService, SocketService } from '@services';
import { PlaylistItem } from 'src/types/SpotifyPlaylists';
import { Playlist } from '@t';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.pug',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit, OnDestroy {
  public spotifyPlaylists: PlaylistItem[];
  public playlists: Playlist[];
  public progress = {};
  private socket: SocketIOClient.Socket;

  constructor(
    private playlistService: PlaylistService,
    private socketService: SocketService,
    private snackBar: MatSnackBar
  ) {}

  async ngOnInit() {
    this.initiateSockets();

    try {
      const res = await this.playlistService.getPlaylists();
      this.spotifyPlaylists = res.spotifyPlaylists.items;
      this.playlists = Object.assign(
        {},
        ...res.playlists.map(playlist => {
          const spotifyPlaylist = this.spotifyPlaylists.find(sp => sp.id === playlist.spotifyId);
          playlist.songAmountDifference = spotifyPlaylist.tracks.total - playlist.totalSongsAtLastImport;

          return { [playlist.spotifyId]: playlist };
        })
      );
    } catch (error) {
      console.log(error);
    }
  }

  ngOnDestroy() {
    this.socket = null;
  }

  public async importPlaylist(playlist: Playlist) {
    try {
      await this.playlistService.importPlaylist(playlist);
    } catch (error) {
      console.log(error);
    }
  }

  private initiateSockets(): void {
    this.socket = this.socketService.getSocket();

    this.socket.on('playlistProgress', (data: { progress: number; playlist: { id: string; name: string } }) => {
      console.log(data);

      this.progress[data.playlist.id] = data.progress * 100;
      if (this.progress[data.playlist.id] === 100) {
        this.snackBar.open(`Finished importing "${data.playlist.name}"`, 'Dismiss', {
          duration: 5000
        });
      }
    });
  }
}
