import { Component, Input } from '@angular/core';
import { Player } from '@types';

@Component({
  selector: 'app-active-players',
  templateUrl: './active-players.component.html',
  styleUrls: ['./active-players.component.scss'],
})
export class ActivePlayersComponent {
  @Input() activePlayers: Player[];
}
