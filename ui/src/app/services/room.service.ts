import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

import { environment } from '@environment';
import { Playlist, Room } from '@types';

interface CreateBody {
  playlists: Playlist[];
  name: string;
  status: 'public' | 'private';
  password: string;
}

@Injectable()
export class RoomService {
  public roomSource = new BehaviorSubject(null);
  room = this.roomSource.asObservable();

  constructor(private http: HttpClient) {}

  public create(body: CreateBody) {
    const url = `${environment.apiUrl}/rooms`;
    return this.http.post<Room>(url, body).toPromise();
  }

  public all() {
    const url = `${environment.apiUrl}/rooms`;
    return this.http.get(url).toPromise() as Promise<{ rooms: Room[] }>;
  }

  public get(slug: Room['slug']) {
    const url = `${environment.apiUrl}/rooms/${slug}`;
    return this.http.get(url).toPromise() as Promise<Room>;
  }
}
