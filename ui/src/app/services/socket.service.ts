import io from 'socket.io-client';

import { Injectable } from '@angular/core';
import { environment } from '@environment';

@Injectable()
export class SocketService {
  socket: SocketIOClient.Socket;
  roomsNamespace: SocketIOClient.Socket;

  initiateSocket = () => {
    this.socket = io(`${environment.apiUrl}/`, {
      transports: ['websocket'],
    });
  };

  joinRoom = (roomId: string) => {
    // this.socket.of('rooms').emit('join', {
    //   roomId,
    // });
    // this.socket = io(`${environment.apiUrl}/rooms`);
  };

  leaveRoom = (room: string) => {
    // this.socket.emit('leave', room);
  };

  getSocket = () => {
    return this.socket;
  };
}
