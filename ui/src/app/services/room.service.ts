import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
  constructor(private http: HttpClient) {}

  public create(body: CreateBody) {
    const url = `${environment.apiUrl}/rooms`;
    return this.http.post(url, body).toPromise();
  }

  public all() {
    const url = `${environment.apiUrl}/rooms`;
    return this.http.get(url).toPromise() as Promise<{ rooms: Room[] }>;
  }
}
