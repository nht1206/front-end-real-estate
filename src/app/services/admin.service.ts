import { Page } from './../models/page';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private readonly API = 'https://rhys-api.herokuapp.com/api/v1/admins/';
  constructor(private http: HttpClient) {}

  getAdmins(page): Observable<Page<User>> {
    return this.http.get<Page<User>>(this.API + '?page=' + page);
  }

  createAccount(user): Observable<any> {
    return this.http.post<any>(this.API, user);
  }

  blockAdmin(id): Observable<any> {
    return this.http.post<any>(this.API + id + '/block', {});
  }

  unblockAdmin(id): Observable<any> {
    return this.http.post<any>(this.API + id + '/unblock', {});
  }

  deleteAdmin(id): Observable<any> {
    return this.http.delete<any>(this.API + id + '/delete', {});
  }
}
