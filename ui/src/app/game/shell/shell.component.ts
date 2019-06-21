import { Component, OnInit } from '@angular/core';
import * as socketIo from 'socket.io-client';

import { SocketService, GameService } from '@services';

@Component({
  selector: 'app-game-shell',
  templateUrl: './shell.component.pug',
  styleUrls: ['./shell.component.scss']
})
export class GameShellComponent implements OnInit {
  public socket: SocketIOClient.Socket;

  constructor(private gameService: GameService, private socketService: SocketService) {}

  ngOnInit() {}
}
