// core/services/personal-medico.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

@Injectable({
  providedIn: 'root'
})
export class PersonalMedicoService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getCirujanos(): Observable<Cirujano[]> {
    return this.http.get<Cirujano[]>(`${this.baseUrl}/cirujanos`);
  }

  getAnestesiologos(): Observable<Anestesiologo[]> {
    return this.http.get<Anestesiologo[]>(`${this.baseUrl}/anestesiologos`);
  }

  getInstrumentistas(): Observable<Instrumentista[]> {
    return this.http.get<Instrumentista[]>(`${this.baseUrl}/instrumentistas`);
  }

  getCirculantes(): Observable<Circulante[]> {
    return this.http.get<Circulante[]>(`${this.baseUrl}/circulantes`);
  }

  getResidentes(): Observable<Residente[]> {
    return this.http.get<Residente[]>(`${this.baseUrl}/residentes`);
  }

  getInternos(): Observable<Interno[]> {
    return this.http.get<Interno[]>(`${this.baseUrl}/internos`);
  }

  getApoyoExterno(): Observable<ApoyoExterno[]> {
    return this.http.get<ApoyoExterno[]>(`${this.baseUrl}/apoyo-externo`);
  }
}


