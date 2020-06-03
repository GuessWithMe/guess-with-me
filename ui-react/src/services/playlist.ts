import config from "config";

import { Playlist, SpotifyPlaylist } from "commonTypes";

import http from "lib/http";

class PlaylistService {
  public list = async () => {
    const res = await http<{
      playlists: Playlist[];
      spotifyPlaylists: SpotifyPlaylist[];
    }>(`${config.apiUrl}/playlists`);
    return res;
  };
}

export default new PlaylistService();
