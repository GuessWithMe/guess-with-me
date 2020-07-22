import WebSocket from 'ws';

import { User, SpotifyPlaylist } from '@types';
import { worker } from 'worker';

class PlaylistService {
  public import = async (ws: WebSocket, id: SpotifyPlaylist['id'], user: User) => {
    worker.importPlaylist(user, id, ws);
  };
}

export default PlaylistService;
