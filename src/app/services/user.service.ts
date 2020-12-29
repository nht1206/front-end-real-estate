import { Page } from './../models/page';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Post } from '../models/post';
import { Password } from '../models/password';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly API = 'https://rhys-api.herokuapp.com/api/v1/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<Page<User>> {
    return this.http.get<Page<User>>(this.API);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.API}/${id}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.API, user);
  }

  editUser(user: User): Observable<User> {
    return this.http.patch<User>(`${this.API}/${user.id}`, user);
  }

  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(`${this.API}/${id}`);
  }

  getPostsByUserId(
    id: number,
    page: number,
    search: string
  ): Observable<Iterable<Post>> {
    return this.http.get<Iterable<Post>>(
      `${this.API}/${id}/posts?search=${search}&page=${page}`
    );
  }

  unblockUserById(id: number): Observable<any> {
    return this.http.post<any>(`${this.API}/${id}/unblock`, {});
  }

  blockUserById(id: number, reason: string): Observable<any> {
    return this.http.post<any>(`${this.API}/${id}/block`, { reason });
  }

  searchUsers(keyword: string, page = 0): Observable<Page<User>> {
    return this.http.post<Page<User>>(this.API + '/search?page=' + page, {
      keyword,
    });
  }

  changePassword(userId: number, password: Password): Observable<User> {
    return this.http.patch<User>(
      `${this.API}/${userId}/changePassword`,
      password
    );
  }
}
