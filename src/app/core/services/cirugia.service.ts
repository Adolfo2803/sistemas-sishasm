// core/services/cirugia.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Cirugia, CirugiaFiltros } from '../models/cirugia.model';

@Injectable({
  providedIn: 'root'
})
export class CirugiaService {
  private apiUrl = 'http://localhost:8080/api/cirugias';

  constructor(private http: HttpClient) {}

  getCirugias(filtros?: CirugiaFiltros): Observable<Cirugia[]> {
    let params = new HttpParams();

    if (filtros) {
      if (filtros.fecha) {
        params = params.set('fecha', filtros.fecha.toISOString());
      }
      if (filtros.numeroQuirofano) {
        params = params.set('numeroQuirofano', filtros.numeroQuirofano.toString());
      }
      if (filtros.estado) {
        params = params.set('estado', filtros.estado);
      }
      if (filtros.cirujanoId) {
        params = params.set('cirujanoId', filtros.cirujanoId.toString());
      }
      if (filtros.pacienteId) {
        params = params.set('pacienteId', filtros.pacienteId.toString());
      }
    }

    return this.http.get<Cirugia[]>(this.apiUrl, { params });
  }

  getCirugiaById(id: number): Observable<Cirugia> {
    return this.http.get<Cirugia>(`${this.apiUrl}/${id}`);
  }

  createCirugia(cirugia: Cirugia): Observable<any> {
    return this.http.post(this.apiUrl, cirugia).pipe(
      tap(response => console.log('Respuesta del servidor:', response)),
      catchError(error => {
        console.error('Error en la petición:', error);
        return throwError(() => error);
      })
    );
  }

  updateCirugia(id: number, cirugia: Cirugia): Observable<Cirugia> {
    return this.http.put<Cirugia>(`${this.apiUrl}/${id}`, cirugia);
  }

  deleteCirugia(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getCirugiasByFecha(fecha: Date): Observable<Cirugia[]> {
    return this.http.get<Cirugia[]>(`${this.apiUrl}/fecha/${fecha.toISOString().split('T')[0]}`);
  }

  getCirugiasByQuirofano(numeroQuirofano: number): Observable<Cirugia[]> {
    return this.http.get<Cirugia[]>(`${this.apiUrl}/quirofano/${numeroQuirofano}`);
  }

  addResidentesToCirugia(cirugiaId: number, residenteIds: number[]): Observable<Cirugia> {
    return this.http.post<Cirugia>(`${this.apiUrl}/${cirugiaId}/residentes`, residenteIds);
  }

  addInternosToCirugia(cirugiaId: number, internoIds: number[]): Observable<Cirugia> {
    return this.http.post<Cirugia>(`${this.apiUrl}/${cirugiaId}/internos`, internoIds);
  }

  addApoyoExternoToCirugia(cirugiaId: number, apoyoExternoIds: number[]): Observable<Cirugia> {
    return this.http.post<Cirugia>(`${this.apiUrl}/${cirugiaId}/apoyo-externo`, apoyoExternoIds);
  }
}
