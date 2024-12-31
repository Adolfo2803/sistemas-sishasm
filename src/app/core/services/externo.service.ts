import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApoyoExterno} from '../models/personal-medico.model';



@Injectable({
  providedIn: 'root'
})
export class ExternoService {
  // private readonly baseUrl = 'http://172.16.36.147:8080/api/apoyo-externo';
  private readonly baseUrl = 'http://192.168.1.75:8080/api/apoyo-externo';
  // private readonly baseUrl = 'http://localhost:8080/api/apoyo-externo';
  private http = inject(HttpClient);

  getAll(): Observable<ApoyoExterno[]> {
    return this.http.get<ApoyoExterno[]>(this.baseUrl);
  }

  getById(id: number): Observable<ApoyoExterno> {
    return this.http.get<ApoyoExterno>(`${this.baseUrl}/${id}`);
  }

  create(externo: ApoyoExterno): Observable<ApoyoExterno> {
    return this.http.post<ApoyoExterno>(this.baseUrl, externo);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  update(id: number, externo: ApoyoExterno): Observable<ApoyoExterno> {
    return this.http.put<ApoyoExterno>(`${this.baseUrl}/${id}`, externo);
  }
}
