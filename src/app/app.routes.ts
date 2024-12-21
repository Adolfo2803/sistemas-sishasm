// app.routes.ts
import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { publicGuard } from './core/guards/public.guard';

export const routes: Routes = [
  // Rutas públicas agrupadas
  {
    path: '',
    children: [
      {
        path: 'login',
        loadComponent: () => import('./features/auth/login/login/login.component')
          .then(m => m.LoginComponent),
        canActivate: [publicGuard]
      },
      {
        path: 'register',
        loadComponent: () => import('./features/auth/register/register/register.component')
          .then(m => m.RegisterComponent),
        canActivate: [publicGuard]
      },
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      }
    ]
  },

  // Ruta del Dashboard y sus rutas hijas
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard/dashboard.component'),
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./features/dashboard/dashboard/dashboard-home/dashboard-home/dashboard-home.component')
      },
      {
        path: 'cirugias',
        children: [
          {
            path: '',
            loadComponent: () => import('./features/cirugias/list/cirugia-list/cirugia-list.component')
          },
          {
            path: 'new',
            loadComponent: () => import('./features/cirugias/form/cirugia-form/cirugia-form.component')
          },
          {
            path: ':id/edit',
            loadComponent: () => import('./features/cirugias/form/cirugia-form/cirugia-form.component')
          }
        ]
      }
    ]
  },

  {
    path: '**',
    redirectTo: '/dashboard'
  }
];
