// app.routes.ts
import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { publicGuard } from './core/guards/public.guard'; // Crearemos este guard

export const routes: Routes = [
  // Rutas públicas agrupadas
  {
    path: '',
    children: [
      {
        path: 'login',
        loadComponent: () => import('./features/auth/login/login/login.component')
          .then(m => m.LoginComponent),
        canActivate: [publicGuard] // Usamos el nuevo guard
      },
      {
        path: 'register',
        loadComponent: () => import('./features/auth/register/register/register.component')
          .then(m => m.RegisterComponent),
        canActivate: [publicGuard] // Usamos el nuevo guard
      },
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      }
    ]
  },

  // Rutas protegidas
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard/dashboard.routes')
      .then((m) => m.dashboardRoutes),
    canActivate: [authGuard]
  },

  {
    path: '**',
    redirectTo: '/dashboard'
  }
];
