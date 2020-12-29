import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { User } from '../models/user';
import { tap } from 'rxjs/operators';

const AUTH_API = 'https://rhys-api.herokuapp.com/api/v1/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: Subject<User>;

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {
    this.currentUserSubject = new Subject<User>();
  }

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
    if (this.storageService.getToken == null) {
      this.currentUserSubject.next(null);
    }
    this.http.get<User>(AUTH_API + 'me', httpOptions).subscribe(
      (user) => this.currentUserSubject.next(user),
      () => this.currentUserSubject.next(null)
    );
    return this.currentUserSubject.asObservable();
  }
}
