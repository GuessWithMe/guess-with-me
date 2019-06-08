import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { environment } from './../../environments/environment';

@Injectable()
export class GameService {
  private songSource = new BehaviorSubject(null);
  song = this.songSource.asObservable();

  constructor(
    private http: HttpClient
  ) {}


  public setCurrentSong(song) {
    this.songSource.next(song);
  }


  public getStatus() {
    const url = `${environment.apiUrl}/game/status`;
    return this.http.get(url).toPromise();
  }


  public addUserToPlayerList(socket) {
    const url = `${environment.apiUrl}/game/add-player`;
    return this.http.post(url, {
      socketId: socket.id
    }).toPromise();
  }


  public removeUserFromPlayerList(socket) {
    const url = `${environment.apiUrl}/game/remove-player`;
    return this.http.post(url, {
      socketId: socket.id
    }).toPromise();
  }
}
