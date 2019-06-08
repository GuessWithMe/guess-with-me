import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';

import {
  Interceptor, PlaylistService, SpotifyService, UserService, SocketService,
  GameService,
  AuthService
} from '@services';

import { AppRoutingModule } from './app-routing.module';
import { LandingModule } from './landing/landing.module';
import { MaterialImportsModule } from './material-imports.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    LandingModule,
    MaterialImportsModule,
  ],
  providers: [
    HttpClient,
    PlaylistService,
    SpotifyService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true,
    },
    SocketService,
    GameService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
