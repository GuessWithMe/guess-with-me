import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game.component';
import { PlaylistsComponent } from '../playlists/playlists.component';
import { GameShellComponent } from './shell/shell.component';


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
        path: '',
        component: GameComponent,
      },
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class GameRoutingModule { }
