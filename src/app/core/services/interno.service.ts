import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Circulante, Interno } from '../models/personal-medico.model';



@Injectable({
  providedIn: 'root'
})
export class InternoService {
  // private readonly baseUrl = 'http://172.16.36.147:8080/api/internos';
  private readonly baseUrl = 'http://localhost:8080/api/internos';
  private http = inject(HttpClient);

  getAll(): Observable<Interno[]> {
    return this.http.get<Interno[]>(this.baseUrl);
  }

  getById(id: number): Observable<Interno> {
    return this.http.get<Interno>(`${this.baseUrl}/${id}`);
  }

  create(interno: Interno): Observable<Interno> {
    return this.http.post<Interno>(this.baseUrl, interno);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  update(id: number, interno: Interno): Observable<Interno> {
    return this.http.put<Interno>(`${this.baseUrl}/${id}`, interno);
  }
}
