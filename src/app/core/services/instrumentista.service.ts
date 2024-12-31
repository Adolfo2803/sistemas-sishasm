import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Instrumentista } from '../models/personal-medico.model';



@Injectable({
  providedIn: 'root'
})
export class InstrumentistaService {
  // private readonly baseUrl = 'http://172.16.36.147:8080/api/instrumentistas';
  private readonly baseUrl = 'http://192.168.1.75:8080/api/instrumentistas';
  // private readonly baseUrl = 'http://localhost:8080/api/instrumentistas';
  private http = inject(HttpClient);

  getAll(): Observable<Instrumentista[]> {
    return this.http.get<Instrumentista[]>(this.baseUrl);
  }

  getById(id: number): Observable<Instrumentista> {
    return this.http.get<Instrumentista>(`${this.baseUrl}/${id}`);
  }

  create(instrumentista: Instrumentista): Observable<Instrumentista> {
    return this.http.post<Instrumentista>(this.baseUrl, instrumentista);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  update(id: number, instrumentista: Instrumentista): Observable<Instrumentista> {
    return this.http.put<Instrumentista>(`${this.baseUrl}/${id}`, instrumentista);
  }
}
