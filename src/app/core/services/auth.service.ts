import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LoginRequest, RegisterRequest, AuthResponse } from '../models/auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'http://localhost:8080/api/auth';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.checkToken();
  }

    // Agregar este método para los guards
    isAuthenticated(): boolean {
      return this.isAuthenticatedSubject.value;
    }


  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/login`, credentials)
      .pipe(
        tap(response => {
          if (this.isBrowser) {
            localStorage.setItem('token', response.token);
            this.isAuthenticatedSubject.next(true);
          }
        })
      );
  }

  register(userData: RegisterRequest): Observable<any> {
   // Creamos el objeto exactamente como lo espera el backend
   const requestBody = {
    username: userData.username,
    password: userData.password,
    rol: userData.rol
  };


    // Configuramos los headers
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    // Aseguramos que el rol se envía como string
    const requestData = {
      ...userData,
      rol: userData.rol.toString()
    };

    // Hacemos el log de la data que se enviará
    console.log('URL de registro:', `${this.API_URL}/registro`);
    console.log('Datos a enviar:', JSON.stringify(requestData));

    return this.http.post(
      `${this.API_URL}/registro`,
      JSON.stringify(requestBody),
      httpOptions
    );
  }


  private handleError(error: HttpErrorResponse) {
    console.error('Error completo:', error);

    if (error.status === 0) {
      console.error('Error de conexión:', error.error);
      return throwError(() => 'Error de conexión con el servidor. Por favor, verifica tu conexión a internet.');
    } else {
      console.error(
        `Backend retornó código ${error.status}, ` +
        `body was: ${JSON.stringify(error.error)}`);
      return throwError(() => error.error?.message || 'Error en el servidor.');
    }
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem('token');
      this.isAuthenticatedSubject.next(false);
    }
  }

  private checkToken(): void {
    if (this.isBrowser) {
      const token = localStorage.getItem('token');
      this.isAuthenticatedSubject.next(!!token);
    }
  }

  getToken(): string | null {
    if (this.isBrowser) {
      return localStorage.getItem('token');
    }
    return null;
  }
}
