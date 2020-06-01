import config from "config";

import { Playlist, PlaylistItem } from "commonTypes";

import http from "lib/http";

class PlaylistService {
  public list = async () => {
    const res = await http<{
      playlists: Playlist[];
      spotifyPlaylists: PlaylistItem[];
    }>(`${config.apiUrl}/playlists`);
    return res;
  };
}

export default new PlaylistService();
