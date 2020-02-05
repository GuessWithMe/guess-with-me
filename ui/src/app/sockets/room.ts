import io from 'socket.io-client';

import { environment } from '@environment';
import { Room } from '@types';

class RoomSocket {
  public namespace: SocketIOClient.Socket;

  constructor() {
    this.namespace = io(`${environment.apiUrl}/rooms`);
  }

  join(roomId: Room['id']) {
    this.namespace.emit('join', {
      roomId,
    });
  }

  leave(roomId: Room['id']) {
    this.namespace.emit('leave', {
      roomId,
    });
  }

  updateProgress(roomId: Room['id']) {
    // this.namespace.emit('guessProgressUpdate', {
    //   userId: this.user.id,
    //   spotifyUsername: this.user.spotifyUsername,
    //   titleCorrect: this.guess.titleCorrect,
    //   artistCorrect: this.guess.artistCorrect,
    // });
    // this.namespace.emit('leave', {
    //   roomId,
    // });
  }
}

export default RoomSocket;
