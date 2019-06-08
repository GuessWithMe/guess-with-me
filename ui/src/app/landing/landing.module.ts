import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { MaterialImportsModule } from '../material-imports.module';

import { LandingComponent } from './landing.component';


@NgModule({
  declarations: [
    LandingComponent
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    MaterialImportsModule,
  ],
  providers: [],
})
export class LandingModule {}
