import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  signOut() {
    window.localStorage.clear();
  }

  public saveToken(token: any) {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
  }

  public getToken(): any {
    return JSON.parse(localStorage.getItem(TOKEN_KEY));
  }
}
