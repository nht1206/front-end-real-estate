import { RoleName } from './../models/role-name';
import { TokenStorageService } from './token-storage.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../models/user';

const AUTH_API = 'http://localhost:8080/api/v1/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  user$: Observable<User> = this.userSubject.asObservable();

  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService
  ) {}

  login(credentials): Observable<any> {
    return this.http.post(
      AUTH_API + 'signin',
      {
        email: credentials.email,
        password: credentials.password,
      },
      httpOptions
    );
  }

  logout(): void {
    this.tokenStorageService.signOut();
    this.userSubject.next(null);
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

  getCurrentUser(): void {
    if (this.tokenStorageService.getToken()) {
      this.http.get<User>(AUTH_API + 'me', httpOptions).subscribe((user) => {
        if (user) {
          this.userSubject.next(user);
        }
      });
    } else {
      this.userSubject.next(null);
    }
  }

  hasRole(roleName: RoleName) {
    let result = false;
    this.user$.subscribe((user) => {
      if (user) {
        user.roles.forEach((userRole) => {
          if (userRole.roleName === roleName) {
            result = true;
          }
        });
      }
    });
    return result;
  }
}
