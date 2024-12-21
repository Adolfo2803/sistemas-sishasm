// core/services/paciente.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Cirujano,
  Anestesiologo,
  Instrumentista,
  Circulante,
  Residente,
  Interno,
  ApoyoExterno
} from '../models/personal-medico.model';
import { Paciente } from '../models/paciente.model';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  private apiUrl = 'http://localhost:8080/api/pacientes';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  getPacientes(): Observable<Paciente[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');

    return this.http.get<Paciente[]>(this.apiUrl, { headers });
  }


  getPacienteById(id: number): Observable<Paciente> {
    return this.http.get<Paciente>(`${this.apiUrl}/${id}`);
  }

  searchPacientes(term: string): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(`${this.apiUrl}/search`, {
      params: { term }
    });
  }

  getPacientesConLog(): Observable<Paciente[]> {
    return new Observable(observer => {
      this.http.get<Paciente[]>(this.apiUrl).subscribe({
        next: (data) => {
          console.log('Pacientes recibidos:', data);
          observer.next(data);
          observer.complete();
        },
        error: (error) => {
          console.error('Error obteniendo pacientes:', error);
          observer.error(error);
        }
      });
    });
  }

}
