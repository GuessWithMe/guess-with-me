import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable()
export class AdminService {
  constructor(
    private http: HttpClient
  ) {}


  public truncateDatabase() {
    const url = `${environment.apiUrl}/admin/truncate`;
    return this.http.get(url).toPromise();
  }
}
