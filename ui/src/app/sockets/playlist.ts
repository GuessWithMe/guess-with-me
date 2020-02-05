import io from 'socket.io-client';

import { environment } from '@environment';

class PlaylistSocket {
  public namespace: SocketIOClient.Socket;

  constructor() {
    this.namespace = io(`${environment.apiUrl}/playlists`);
  }

  join() {
    this.namespace.emit('join');
  }

  leave() {
    this.namespace.emit('leave');
  }
}

export default PlaylistSocket;
