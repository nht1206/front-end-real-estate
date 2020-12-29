import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from '../models/role';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private readonly API = 'https://rhys-api.herokuapp.com/api/v1/roles';

  constructor(private http: HttpClient) {}

  getRoles(): Observable<Array<Role>> {
    return this.http.get<Array<Role>>(this.API);
  }

  createRole(role: Role): Observable<Role> {
    return this.http.post<Role>(this.API, role);
  }

  deleteRole(id: number): Observable<Role> {
    return this.http.delete<Role>(`${this.API}/${id}`);
  }
}
