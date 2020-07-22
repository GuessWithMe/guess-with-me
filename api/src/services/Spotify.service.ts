import SpotifyWebApi from 'spotify-web-api-node';

import { SpotifyHelper } from 'helpers';
import { User } from 'models';
import { SpotifyPlaylist } from 'types/SpotifyPlaylist';

const PAGE_SIZE = 20;

class SpotifyService {
  public spotify: SpotifyWebApi;

  public async getUserPlaylists(user: User) {
    this.spotify = await SpotifyHelper.initializeSpotify(user);
    let spotifyPlaylists: SpotifyPlaylist[] = [];
    let next;
    let offset = 0;

    do {
      const res = await this.spotify.getUserPlaylists(user.spotifyUsername, { offset });
      spotifyPlaylists = [...spotifyPlaylists, ...((res.body.items as unknown) as SpotifyPlaylist[])];
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
