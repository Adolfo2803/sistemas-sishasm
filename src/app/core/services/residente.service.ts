import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Anestesiologo, Circulante, Residente } from '../models/personal-medico.model';



@Injectable({
  providedIn: 'root'
})
export class ResidenteService {
  // private readonly baseUrl = 'http://172.16.36.147:8080/api/residentes';
  private readonly baseUrl = 'http://192.168.1.75:8080/api/residentes';
  // private readonly baseUrl = 'http://localhost:8080/api/residentes';
  private http = inject(HttpClient);

  getAll(): Observable<Residente[]> {
    return this.http.get<Residente[]>(this.baseUrl);
  }

  getById(id: number): Observable<Residente> {
    return this.http.get<Residente>(`${this.baseUrl}/${id}`);
  }

  create(residente: Residente): Observable<Residente> {
    return this.http.post<Residente>(this.baseUrl, residente);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  update(id: number, residente: Residente): Observable<Residente> {
    return this.http.put<Residente>(`${this.baseUrl}/${id}`, residente);
  }
}
