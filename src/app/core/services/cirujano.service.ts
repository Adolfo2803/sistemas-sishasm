import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Circulante, Cirujano } from '../models/personal-medico.model';



@Injectable({
  providedIn: 'root'
})
export class CirujanoService {
  // private readonly baseUrl = 'http://172.16.36.147:8080/api/cirujanos';
  private readonly baseUrl = 'http://192.168.1.75:8080/api/cirujanos';
  // private readonly baseUrl = 'http://localhost:8080/api/cirujanos';
  private http = inject(HttpClient);

  getAll(): Observable<Cirujano[]> {
    return this.http.get<Cirujano[]>(this.baseUrl);
  }

  getById(id: number): Observable<Cirujano> {
    return this.http.get<Cirujano>(`${this.baseUrl}/${id}`);
  }

  create(cirujano: Cirujano): Observable<Cirujano> {
    return this.http.post<Cirujano>(this.baseUrl, cirujano);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  update(id: number, cirujano: Cirujano): Observable<Cirujano> {
    return this.http.put<Cirujano>(`${this.baseUrl}/${id}`, cirujano);
  }
}
