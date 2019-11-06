import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Playlist } from '@types';
import { PlaylistService, RoomService } from '@services';

@Component({
  selector: 'app-rooms-create',
  templateUrl: './create.component.pug',
  styleUrls: ['./create.component.scss']
})
export class RoomsCreateComponent implements OnInit, OnDestroy {
  roomForm = new FormGroup({
    title: new FormControl(''),
    status: new FormControl('public'),
    password: new FormControl()
  });

  selectedPlaylists: Playlist[] = [];
  playlists: Playlist[] = [];

  constructor(private playlistService: PlaylistService, private roomService: RoomService) {}

  async ngOnInit() {
    try {
      const res = await this.playlistService.getImportedPlaylists();
      this.playlists = res.playlists;
    } catch (error) {
      console.log(error);
    }
  }

  ngOnDestroy() {}

  checkIfSelected = (playlist: Playlist) => {
    return this.selectedPlaylists.includes(playlist);
  };

  togglePlaylist = (playlist: Playlist) => {
    if (this.selectedPlaylists.includes(playlist)) {
      this.selectedPlaylists = this.selectedPlaylists.filter(p => p !== playlist);
    } else {
      this.selectedPlaylists.push(playlist);
    }
  };

  createRoom = async () => {
    try {
      await this.roomService.create({
        ...this.roomForm.value,
        playlists: this.selectedPlaylists
      });
    } catch (error) {
      console.log(error);
    }
  };
}
