import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CountdownModule } from 'ngx-countdown';

import { GameRoutingModule } from './game-routing.module';
import { MaterialImportsModule } from 'src/app/material-imports.module';

import { ActivePlayersComponent } from './active-players/active-players.component';
import { GameComponent } from './game.component';
import { GameShellComponent } from './shell/shell.component';
import { PlaylistsComponent } from '../playlists/playlists.component';
import { PreviousTracksComponent } from './previous-tracks/previous-tracks.component';
import { RoomsComponent } from '../rooms/rooms.component';
import { RoomsCreateComponent } from '../rooms/create/create.component';
import { ToolbarComponent } from '../toolbar/toolbar.component';

@NgModule({
  declarations: [
    ActivePlayersComponent,
    GameComponent,
    GameShellComponent,
    PlaylistsComponent,
    PreviousTracksComponent,
    RoomsComponent,
    RoomsCreateComponent,
    ToolbarComponent,
  ],
  imports: [
    CommonModule,
    GameRoutingModule,
    MaterialImportsModule,
    FormsModule,
    ReactiveFormsModule,
    CountdownModule,
  ],
  providers: [],
})
export class GameModule {}
