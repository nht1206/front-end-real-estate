import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reason } from '../models/reason';

@Injectable({
  providedIn: 'root',
})
export class ReasonService {
  private readonly API = 'https://rhys-api.herokuapp.com/v1/reasons';

  constructor(private http: HttpClient) {}

  getReasons(): Observable<Array<Reason>> {
    return this.http.get<Array<Reason>>(this.API);
  }

  getReasonById(id: number): Observable<Reason> {
    return this.http.get<Reason>(`${this.API}/${id}`);
  }

  createReason(reason: Reason): Observable<Reason> {
    return this.http.post<Reason>(this.API, reason);
  }

  updateReason(reason: Reason): Observable<Reason> {
    return this.http.patch<Reason>(`${this.API}/${reason.id}`, reason);
  }

  deleteReason(id: number): Observable<Reason> {
    return this.http.delete<Reason>(`${this.API}/${id}`);
  }
}
