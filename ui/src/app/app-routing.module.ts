import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: 'game', loadChildren: './game/game.module#GameModule' },
  { path: 'admin', loadChildren: './admin/admin.module#AdminModule' },
  { path: '', loadChildren: './landing/landing.module#LandingModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      // { enableTracing: true }
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
