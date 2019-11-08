import { Component, OnInit } from '@angular/core';

import { SocketService } from '@services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private socketService: SocketService) {}

  ngOnInit() {
    this.socketService.initiateSocket();
  }
}
