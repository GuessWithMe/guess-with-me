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
   */
  public getUser() {
    const url = `${environment.apiUrl}/users/current`;
    return this.http.get<User>(url).toPromise();
  }

  public setUser(user: User) {
    this.userSource.next(user);
  }
}
