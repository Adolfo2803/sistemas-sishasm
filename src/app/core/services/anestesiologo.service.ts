import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Anestesiologo, Circulante } from '../models/personal-medico.model';



@Injectable({
  providedIn: 'root'
})
export class AnestesiologoService {
  // private readonly baseUrl = 'http://172.16.36.147:8080/api/anestesiologos';
  private readonly baseUrl = 'http://localhost:8080/api/anestesiologos';
  private http = inject(HttpClient);

  getAll(): Observable<Anestesiologo[]> {
    return this.http.get<Anestesiologo[]>(this.baseUrl);
  }

  getById(id: number): Observable<Anestesiologo> {
    return this.http.get<Anestesiologo>(`${this.baseUrl}/${id}`);
  }

  create(anestesiologo: Anestesiologo): Observable<Anestesiologo> {
    return this.http.post<Anestesiologo>(this.baseUrl, anestesiologo);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  update(id: number, anestesiologo: Anestesiologo): Observable<Anestesiologo> {
    return this.http.put<Anestesiologo>(`${this.baseUrl}/${id}`, anestesiologo);
  }
}
