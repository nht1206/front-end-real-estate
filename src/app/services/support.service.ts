import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Support } from '../models/support';

@Injectable({
  providedIn: 'root',
})
export class SupportService {
  private readonly API = 'https://rhys-api.herokuapp.com/api/v1/supports';

  constructor(private http: HttpClient) {}

  getSupports(): Observable<Array<Support>> {
    return this.http.get<Array<Support>>(this.API);
  }

  createSupport(support: Support): Observable<Support> {
    return this.http.post<Support>(this.API, support);
  }

  editSupport(support: Support): Observable<Support> {
    return this.http.patch<Support>(`${this.API}/${support.id}`, support);
  }

  deleteSupport(id: number): Observable<Support> {
    return this.http.delete<Support>(`${this.API}/${id}`);
  }

  getSupportById(id: number): Observable<Support> {
    return this.http.get<Support>(`${this.API}/${id}`);
  }

  getSupportsByReasonId(
    reasonId: number,
    page: number
  ): Observable<Array<Support>> {
    return this.http.get<Array<Support>>(
      `${this.API}/?reasonId=${reasonId}&page=${page}`
    );
  }
}
