import { Component, OnInit, Input } from '@angular/core';

import { GameService } from '@services';

@Component({
  selector: 'app-active-players',
  templateUrl: './active-players.component.pug',
  styleUrls: ['./active-players.component.scss']
})
export class ActivePlayersComponent implements OnInit {
  @Input() activePlayers: any;
  public displayedColumns: string[] = ['username', 'artistCorrect', 'titleCorrect'];


  constructor(
    private gameService: GameService,
  ) {}


  async ngOnInit() {

  }
}

