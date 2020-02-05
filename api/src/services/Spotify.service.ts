import SpotifyWebApi from 'spotify-web-api-node';

import { SpotifyHelper } from 'helpers';
import { User } from 'models';

class SpotifyService {
  public spotify: SpotifyWebApi;

  public async getUserPlaylists(user: User) {
    this.spotify = await SpotifyHelper.initializeSpotify(user);
    const res = await this.spotify.getUserPlaylists(user.spotifyUsername);
    return res.body;
  }

  public async getPlaylist(user: User, id: string) {
    this.spotify = await SpotifyHelper.initializeSpotify(user);
    const res = await this.spotify.getPlaylist(id);
    return res.body;
  }
}

export default SpotifyService;
