import { SpotifyPlaylist } from "commonTypes";

class PlaylistSocketService {
  public import = (ws: WebSocket, spotifyPlaylistId: SpotifyPlaylist["id"]) => {
    ws.send(
      JSON.stringify({
        type: "IMPORT_PLAYLIST",
        payload: { spotifyPlaylistId },
      })
    );
  };
}

export default new PlaylistSocketService();
