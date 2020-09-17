import { map } from 'rxjs/operators/';
import { RoleName } from './../models/role-name';
import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../models/user';
import { tap } from 'rxjs/operators';

const AUTH_API = 'http://localhost:8080/api/v1/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  login(credentials): Observable<any> {
    return this.http
      .post(
        AUTH_API + 'signin',
        {
          email: credentials.email,
          password: credentials.password,
        },
        httpOptions
      )
      .pipe(
        tap((data) => {
          this.storageService.saveToken(data);
        })
      );
  }

  logout(): void {
    this.storageService.signOut();
  }

  register(user): Observable<any> {
    return this.http.post(
      AUTH_API + 'signup',
      {
        name: user.name,
        email: user.email,
        address: user.address,
        phoneNumber: user.phoneNumber,
        password: user.password,
      },
      httpOptions
    );
  }

  loadCurrentUser(): Observable<User> {
    return this.http.get<User>(AUTH_API + 'me', httpOptions);
  }
}
