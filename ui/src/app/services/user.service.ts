import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '@environment';
import { User } from '@t';

@Injectable()
export class UserService {
  constructor(
    private http: HttpClient
  ) {}

  /**
   * Retrieves the currently authenticated user.
   * @returns Promise<User>
   * @memberof UserService
   */
  public getUser(): Promise<User> {
    const url = `${environment.apiUrl}/users/current`;
    return this.http.get(url).toPromise() as Promise<User>;
  }
}
