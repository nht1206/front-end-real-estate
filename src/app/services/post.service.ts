import { delay } from 'rxjs/operators';
import { Search } from './../models/search';
import { Page } from './../models/page';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly API = 'http://localhost:8080/api/v1/posts';
  constructor(private http: HttpClient) {}

  getPosts(page = 0): Observable<Page<Post>> {
    return this.http.get<Page<Post>>(this.API);
  }

  addPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.API, post);
  }

  deletePost(id: string): Observable<Post> {
    return this.http.delete<Post>(`${this.API}/${id}`);
  }

  editPost(post: Post, postId: number): Observable<Post> {
    return this.http.patch<Post>(`${this.API}/${postId}`, post);
  }

  getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.API}/${id}`).pipe(delay(300));
  }

  getPostsByUserId(page = 0, userId: number): Observable<Page<Post>> {
    return this.http
      .get<Page<Post>>(this.API + '/user/' + userId + '?page=' + page)
      .pipe(delay(300));
  }

  getPostsByViewCount(): Observable<Array<Post>> {
    return this.http.get<Array<Post>>(this.API + '/mostViewCount');
  }

  updatePostViewCount(postId: number): Observable<Post> {
    return this.http.get<Post>(`${this.API}/update-post-viewCount/${postId}`);
  }

  blockPost(id: number): Observable<any> {
    return this.http.post(`${this.API}/${id}/block`, {});
  }

  unblockPost(id: number): Observable<any> {
    return this.http.post(`${this.API}/${id}/unblock`, {});
  }

  searchAll(option: Search = new Search(), page = 0): Observable<Page<Post>> {
    return this.http
      .post<Page<Post>>(`${this.API}/searchAll?page=${page}`, option)
      .pipe(delay(300));
  }

  searchPendingPosts(
    option: Search = new Search(),
    page = 0
  ): Observable<Page<Post>> {
    return this.http.post<Page<Post>>(
      `${this.API}/searchPending?page=${page}`,
      option
    );
  }

  searchApprovedPosts(
    option: Search = new Search(),
    page = 0
  ): Observable<Page<Post>> {
    return this.http.post<Page<Post>>(
      `${this.API}/searchApproved?page=${page}`,
      option
    );
  }
}
