import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { GameService } from '@services';

@Component({
  selector: 'app-active-players',
  templateUrl: './active-players.component.html',
  styleUrls: ['./active-players.component.scss'],
})
export class ActivePlayersComponent implements OnInit, OnChanges {
  @Input() activePlayers: any;

  constructor(private gameService: GameService) {}

  async ngOnInit() {}

  async ngOnChanges() {}
}
