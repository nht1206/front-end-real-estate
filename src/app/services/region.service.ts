import { Page } from './../models/page';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Region } from '../models/region';

@Injectable({
  providedIn: 'root',
})
export class RegionService {
  private readonly API = 'https://rhys-api.herokuapp.com/api/v1/regions';

  constructor(private http: HttpClient) {}

  getRegions(): Observable<any> {
    return this.http.get<Array<Region>>(this.API);
  }

  getRegionsPages(page: number): Observable<Page<Region>> {
    return this.http.get<Page<Region>>(`${this.API}/pages?page=${page}`);
  }

  getRegionById(id: number): Observable<Region> {
    return this.http.get<Region>(`${this.API}/${id}`);
  }

  createRegion(region: Region): Observable<Region> {
    return this.http.post<Region>(this.API, region);
  }

  updateRegion(region: Region): Observable<Region> {
    return this.http.patch<Region>(`${this.API}/${region.id}`, region);
  }

  deleteRegion(id: number): Observable<Region> {
    return this.http.delete<Region>(`${this.API}/${id}`);
  }
}
