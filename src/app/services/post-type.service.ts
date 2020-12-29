import { Page } from './../models/page';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostType } from '../models/post-type';

@Injectable({
  providedIn: 'root',
})
export class PostTypeService {
  private readonly API = 'https://rhys-api.herokuapp.com/api/v1/postTypes';

  constructor(private http: HttpClient) {}

  getPostTypes(): Observable<any> {
    return this.http.get<Array<PostType>>(this.API);
  }

  getPostTypesPages(page: number): Observable<Page<PostType>> {
    return this.http.get<Page<PostType>>(`${this.API}/pages?page=${page}`);
  }

  createPostType(postType: PostType): Observable<PostType> {
    return this.http.post<PostType>(this.API, postType);
  }

  updatePostType(postType: PostType): Observable<PostType> {
    return this.http.patch<PostType>(`${this.API}/${postType.id}`, postType);
  }

  deletePostType(id: number): Observable<PostType> {
    return this.http.delete<PostType>(`${this.API}/${id}`);
  }

  getPostTypeById(id: number): Observable<PostType> {
    return this.http.get<PostType>(`${this.API}/${id}`);
  }
}
