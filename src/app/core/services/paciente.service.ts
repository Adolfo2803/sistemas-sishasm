// core/services/paciente.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';

import { Paciente } from '../models/paciente.model';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  // private apiUrl = 'http://172.16.36.147:8080/api/pacientes';
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



  updatePaciente(id: number, paciente: Paciente): Observable<Paciente> {
    return this.http.put<Paciente>(`${this.apiUrl}/${id}`, paciente);
  }

  deletePaciente(id: number): Observable<void> {

    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }


  deleteCirugia(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }













  listarPacientes(): Observable<Paciente[]> {
    const token = this.authService.getToken(); // Obtener el token JWT del AuthService
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Paciente[]>(this.apiUrl, { headers });
  }

  obtenerPaciente(id: number): Observable<Paciente> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Paciente>(`${this.apiUrl}/${id}`, { headers });
  }

  // crearPaciente(paciente: Paciente): Observable<Paciente> {
  //   const token = this.authService.getToken();
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   return this.http.post<Paciente>(this.apiUrl, paciente, { headers });
  // }

// paciente.service.ts
crearPaciente(paciente: any): Observable<any> {
  const token = this.authService.getToken();
  const headers = new HttpHeaders()
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json');

  // Log para ver los headers
  console.log('Headers:', {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  });

  return this.http.post(this.apiUrl, paciente, { headers }).pipe(
    tap(response => console.log('Respuesta:', response)),
    catchError(error => {
      console.error('Error completo:', error);
      return throwError(() => error);
    })
  );
}


  actualizarPaciente(id: number, paciente: Paciente): Observable<Paciente> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<Paciente>(`${this.apiUrl}/${id}`, paciente, { headers });
  }

  eliminarPaciente(id: number): Observable<void> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<void>(`${this.apiUrl}/${id}`,{ headers });
  }

  buscarPorExpediente(expediente: string): Observable<Paciente> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Paciente>(`${this.apiUrl}/expediente/${expediente}`, { headers });
  }

  buscarPorCurp(curp: string): Observable<Paciente> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Paciente>(`${this.apiUrl}/curp/${curp}`, { headers });
  }

  buscarPorNombre(nombre: string): Observable<Paciente> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Paciente>(`${this.apiUrl}/nombre/${nombre}`, { headers });
  }

}
