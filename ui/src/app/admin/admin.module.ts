import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { MaterialImportsModule } from 'src/app/material-imports.module';
import { AdminComponent } from './admin.component';
import { AdminService } from '../services/admin.service';

@NgModule({
  declarations: [
    AdminComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialImportsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    AdminService
  ]
})
export class AdminModule { }
