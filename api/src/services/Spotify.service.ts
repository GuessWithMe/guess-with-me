import SpotifyWebApi from 'spotify-web-api-node';

import { SpotifyHelper } from 'helpers';
import { User } from 'models';
import { PlaylistItem } from '../../../types/SpotifyPlaylists';

const PAGE_SIZE = 20;

class SpotifyService {
  public spotify: SpotifyWebApi;

  public async getUserPlaylists(user: User) {
    this.spotify = await SpotifyHelper.initializeSpotify(user);
    let spotifyPlaylists: PlaylistItem[] = [];
    let next;
    let offset = 0;

    do {
      const res = await this.spotify.getUserPlaylists(user.spotifyUsername, { offset });
      spotifyPlaylists = [...spotifyPlaylists, ...(res.body.items as PlaylistItem[])];
      next = res.body.next;
      offset += PAGE_SIZE;
    } while (next);
    return spotifyPlaylists;
  }

  public async getPlaylist(user: User, id: string) {
    this.spotify = await SpotifyHelper.initializeSpotify(user);
    const res = await this.spotify.getPlaylist(id);
    return res.body;
  }
}

export default SpotifyService;
