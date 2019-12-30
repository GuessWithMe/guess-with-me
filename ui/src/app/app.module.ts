import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import {
  AuthService,
  //   Interceptor,
  PlaylistService,
  RoomService,
  SocketService,
  //   SpotifyService,
  UserService,
  Interceptor,
} from '@services';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, HttpClientModule],
  providers: [
    // HttpClient,
    PlaylistService,
    // SpotifyService,
    UserService,
    RoomService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true,
    },
    SocketService,
    AuthService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
