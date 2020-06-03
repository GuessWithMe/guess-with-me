import services from "services";
import { Room, SpotifyPlaylist } from "commonTypes";

class PlaylistSocketService {
  public import = (ws: WebSocket, spotifyPlaylistId: SpotifyPlaylist["id"]) => {
    ws.send(
      JSON.stringify({
        action: "IMPORT_PLAYLIST",
        payload: { spotifyPlaylistId },
      })
    );
  };
}

export default new PlaylistSocketService();
