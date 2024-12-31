// src/app/core/interceptors/auth.interceptor.ts
// import { Injectable, PLATFORM_ID, inject } from '@angular/core';
// import { HttpInterceptorFn } from '@angular/common/http';
// import { isPlatformBrowser } from '@angular/common';

// export const authInterceptor: HttpInterceptorFn = (req, next) => {
//   const platformId = inject(PLATFORM_ID);

//   if (isPlatformBrowser(platformId)) {
//     const token = localStorage.getItem('token');

//     if (token) {
//       const cloned = req.clone({
//         headers: req.headers.set('Authorization', `Bearer ${token}`)
//       });
//       return next(cloned);
//     }
//   }

//   return next(req);
// };


// core/interceptors/auth.interceptor.ts
// import { Injectable } from '@angular/core';
// import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { AuthService } from '../services/auth.service';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//   constructor(private authService: AuthService) {}

//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     const token = this.authService.getToken();

//     if (token) {
//       console.log('Token encontrado:', token); // Para depuración

//       request = request.clone({
//         setHeaders: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       });

//       // Para depuración
//       console.log('Headers de la petición:', request.headers.keys());
//     } else {
//       console.log('No se encontró token');
//     }

//     return next.handle(request);
//   }
// }




// core/interceptors/auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

// core/interceptors/auth.interceptor.ts
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  console.log('Interceptor - Método:', req.method);
  console.log('Interceptor - URL:', req.url);
  console.log('Interceptor - Token presente:', !!token);

  if (token) {
    const modifiedReq = req.clone({
      headers: req.headers
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json')
    });

    return next(modifiedReq);
  }

  return next(req);
};

