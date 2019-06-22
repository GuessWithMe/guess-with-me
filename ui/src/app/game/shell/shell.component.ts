import { Component, OnInit } from '@angular/core';

import { UserService } from '@services';

@Component({
  selector: 'app-game-shell',
  templateUrl: './shell.component.pug',
  styleUrls: ['./shell.component.scss']
})
export class GameShellComponent implements OnInit {
  public socket: SocketIOClient.Socket;

  constructor(private userService: UserService) {}

  async ngOnInit() {
    try {
      const user = await this.userService.getUser();
      this.userService.setUser(user);
    } catch (error) {
      console.log(error);
    }
  }
}
