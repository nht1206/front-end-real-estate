import { Page } from './../models/page';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly API = 'https://rhys-api.herokuapp.com/api/v1/categories';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<any> {
    return this.http.get<Array<Category>>(this.API);
  }

  getCategoriesPages(page: number): Observable<Page<Category>> {
    return this.http.get<Page<Category>>(`${this.API}/pages?page=${page}`);
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.API, category);
  }

  updateCategory(category: Category): Observable<Category> {
    return this.http.patch<Category>(`${this.API}/${category.id}`, category);
  }

  deleteCategory(id: number): Observable<Category> {
    return this.http.delete<Category>(`${this.API}/${id}`);
  }

  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.API}/${id}`);
  }
}
