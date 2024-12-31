import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Circulante } from '../models/personal-medico.model';



@Injectable({
  providedIn: 'root'
})
export class CirculanteService {
  // private readonly baseUrl = 'http://172.16.36.147:8080/api/circulantes';
  private readonly baseUrl = 'http://localhost:8080/api/circulantes';
  private http = inject(HttpClient);

  getAll(): Observable<Circulante[]> {
    return this.http.get<Circulante[]>(this.baseUrl);
  }

  getById(id: number): Observable<Circulante> {
    return this.http.get<Circulante>(`${this.baseUrl}/${id}`);
  }

  create(circulante: Circulante): Observable<Circulante> {
    return this.http.post<Circulante>(this.baseUrl, circulante);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  update(id: number, circulante: Circulante): Observable<Circulante> {
    return this.http.put<Circulante>(`${this.baseUrl}/${id}`, circulante);
  }
}
