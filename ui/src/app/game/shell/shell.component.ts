import { Component, OnInit } from '@angular/core';
import * as socketIo from 'socket.io-client';

import { environment } from '@environment';
import { SocketService, GameService } from '@services';

@Component({
  selector: 'app-game-shell',
  templateUrl: './shell.component.pug',
  styleUrls: ['./shell.component.scss']
})
export class GameShellComponent implements OnInit {
  public socket: SocketIOClient.Socket;

  constructor(private gameService: GameService, private socketService: SocketService) {}

  ngOnInit() {
    this.initiateSockets();
  }

  /**
   * Initiates webosockets for controlling the game flow, incoming songs,
   * connecting/disconnecting players etc.
   * @private
   * @returns void
   * @memberof GameShellComponent
   */
  private initiateSockets(): void {
    this.socket = this.socketService.getSocket();

    if (this.socket) {
      return;
    }

    this.socket = socketIo(environment.apiUrl, {
      transports: ['websocket']
    });

    // this.socket.on('connect', data => {
    //   console.log('socket connected');
    //   this.gameService.addUserToPlayerList(this.socket);
    // });

    this.socket.on('message', (data: any) => {
      // console.log(data);
    });

    this.socketService.setSocket(this.socket);
  }
}
