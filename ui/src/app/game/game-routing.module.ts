import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GameComponent } from './game.component';
import { GameShellComponent } from './shell/shell.component';
import { PlaylistsComponent } from '../playlists/playlists.component';
import { RoomsComponent } from '../rooms/rooms.component';
import { RoomsCreateComponent } from '../rooms/create/create.component';

const routes: Routes = [
  {
    path: '',
    component: GameShellComponent,
    children: [
      {
        path: 'playlists',
        component: PlaylistsComponent,
      },
      {
        path: 'rooms',
        children: [
          {
            path: '',
            component: RoomsComponent,
          },
          {
            path: 'create',
            component: RoomsCreateComponent,
          },
          {
            path: ':slug',
            component: GameComponent,
          },
        ],
      },
      {
        path: '**',
        redirectTo: '/game/rooms',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GameRoutingModule {}
