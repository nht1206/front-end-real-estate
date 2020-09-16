import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Direction } from '../models/direction';

@Injectable({
  providedIn: 'root',
})
export class DirectionService {
  private readonly API = 'http://localhost:8080/api/v1/directions';

  constructor(private http: HttpClient) {}

  getDirections(): Observable<Array<Direction>> {
    return this.http.get<Array<Direction>>(this.API);
  }

  getDirectionById(id: number): Observable<Direction> {
    return this.http.get<Direction>(`${this.API}/${id}`);
  }

  createDirection(direction: Direction): Observable<Direction> {
    return this.http.post<Direction>(this.API, direction);
  }

  updateDirection(direction: Direction): Observable<Direction> {
    return this.http.patch<Direction>(`${this.API}/${direction.id}`, direction);
  }

  deleteDirection(id: number): Observable<Direction> {
    return this.http.delete<Direction>(`${this.API}/${id}`);
  }
}
