import * as socketIo from 'socket.io-client';

import { Injectable } from '@angular/core';
import { environment } from '@environment';

@Injectable()
export class SocketService {
  socket: SocketIOClient.Socket;

  initiateSocket = () => {
    this.socket = socketIo(environment.apiUrl, {
      transports: ['websocket'],
    });
  };

  joinRoom = (room: string) => {
    this.socket.emit('join', room);
  };

  leaveRoom = (room: string) => {
    this.socket.emit('leave', room);
  };

  getSocket = () => {
    return this.socket;
  };
}
