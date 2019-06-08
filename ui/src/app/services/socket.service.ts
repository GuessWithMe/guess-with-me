import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable()
export class SocketService {
  private socketSource = new BehaviorSubject(null);
  socket = this.socketSource.asObservable();

  constructor(private http: HttpClient) {}

  public setSocket(socket: SocketIOClient.Socket) {
    this.socketSource.next(socket);
  }

  public getSocket(): SocketIOClient.Socket {
    return this.socketSource.value;
  }
}
