import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { PlaylistService, SocketService } from '@services';
import { Playlist, PlaylistItem } from '@types';
import PlaylistSocket from '../sockets/playlist';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss'],
})
export class PlaylistsComponent implements OnInit, OnDestroy {
  public spotifyPlaylists: PlaylistItem[];
  public playlists: Playlist[];
  public progress: Record<Playlist['spotifyId'], number> = {};
  private socket: PlaylistSocket;

  constructor(
    private playlistService: PlaylistService,
    private socketService: SocketService,
    private snackBar: MatSnackBar,
  ) {}

  async ngOnInit() {
    this.socket = new PlaylistSocket();
    this.socket.join();

    this.socket.namespace.on(
      'playlistProgress',
      (data: { progress: number; playlist: { spotifyId: string; name: string } }) => {
        this.progress[data.playlist.spotifyId] = data.progress * 100;
        if (this.progress[data.playlist.spotifyId] === 100) {
          this.snackBar.open(`Finished importing "${data.playlist.name}"`, 'Dismiss', {
            duration: 5000,
          });
        }
      },
    );

    try {
      const res = await this.playlistService.getPlaylists();
      this.spotifyPlaylists = res.spotifyPlaylists.items;
      this.playlists = Object.assign(
        {},
        ...res.playlists.map(playlist => {
          const spotifyPlaylist = this.spotifyPlaylists.find(sp => sp.id === playlist.spotifyId);

          if (spotifyPlaylist) {
            playlist.songAmountDifference =
              spotifyPlaylist.tracks.total - playlist.totalSongsAtLastImport;
          }

          return { [playlist.spotifyId]: playlist };
        }),
      );
    } catch (error) {
      console.log(error);
    }
  }

  ngOnDestroy() {
    this.socket.leave();
  }

  public async importPlaylist(playlist: Playlist) {
    this.socketService.getSocket();
    this.socket.namespace.emit('importPlaylist', playlist.id);
  }
}
