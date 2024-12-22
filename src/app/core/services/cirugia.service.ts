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

  getCirugias(filtros?: any): Observable<any[]> {
    // Si hay filtros, usar los endpoints específicos
    if (filtros) {
      if (filtros.fecha) {
        return this.http.get<any[]>(`${this.apiUrl}/fecha/${filtros.fecha}`);
      }
      if (filtros.numeroQuirofano) {
        return this.http.get<any[]>(`${this.apiUrl}/quirofano/${filtros.numeroQuirofano}`);
      }
      if (filtros.cirujanoId) {
        return this.http.get<any[]>(`${this.apiUrl}/cirujano/${filtros.cirujanoId}`);
      }
    }

    // Si no hay filtros, obtener todas
    return this.http.get<any[]>(`${this.apiUrl}`);
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
