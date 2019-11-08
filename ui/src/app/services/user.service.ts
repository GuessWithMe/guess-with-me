import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '@environment';
import { User } from '@types';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class UserService {
  private userSource = new BehaviorSubject(null);
  user = this.userSource.asObservable();

  constructor(private http: HttpClient) {}

  /**
   * Retrieves the currently authenticated user.
   * @returns Promise<User>
   */
  public getUser(): Promise<User> {
    const url = `${environment.apiUrl}/users/current`;
    return this.http.get(url).toPromise() as Promise<User>;
  }

  public setUser(user: User) {
    this.userSource.next(user);
  }
}
