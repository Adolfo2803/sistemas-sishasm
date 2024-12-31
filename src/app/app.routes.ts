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

  // Dashboard y rutas protegidas
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard/dashboard.component'),
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./features/dashboard/dashboard/dashboard-home/dashboard-home/dashboard-home.component')
      },
      // Cirugías
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
      },
      // Pacientes
      {
        path: 'pacientes',
        children: [
          {
            path: '',
            loadComponent: () => import('./features/pacientes/list/paciente-list/paciente-list.component')
          },
          {
            path: 'new',
            loadComponent: () => import('./features/pacientes/form/paciente-form/paciente-form.component')
          },
          {
            path: ':id/edit',
            loadComponent: () => import('./features/pacientes/form/paciente-form/paciente-form.component')
          }
        ]
      },
      // Personal Médico
      {
        path: 'personal',
        children: [
          // Cirujanos
          {
            path: 'cirujanos',
            children: [
              {
                path: '',
                loadComponent: () => import('./features/personal/cirujano/list/cirujano-list/cirujano-list.component')
              },
              {
                path: 'new',
                loadComponent: () => import('./features/personal/cirujano/form/cirujano-form/cirujano-form.component')
              },
              {
                path: ':id/edit',
                loadComponent: () => import('./features/personal/cirujano/form/cirujano-form/cirujano-form.component')
              }
            ]
          },
          // Anestesiólogos
          {
            path: 'anestesiologos',
            children: [
              {
                path: '',
                loadComponent: () => import('./features/personal/anestesiologo/list/anestesiologo-list/anestesiologo-list.component')
              },
              {
                path: 'new',
                loadComponent: () => import('./features/personal/anestesiologo/form/anestesiologo-form/anestesiologo-form.component')
              },
              {
                path: ':id/edit',
                loadComponent: () => import('./features/personal/anestesiologo/form/anestesiologo-form/anestesiologo-form.component')
              }
            ]
          },
          // Instrumentistas
          {
            path: 'instrumentistas',
            children: [
              {
                path: '',
                loadComponent: () => import('./features/personal/instrumentista/list/instrumentista-list/instrumentista-list.component')
              },
              {
                path: 'new',
                loadComponent: () => import('./features/personal/instrumentista/form/instrumentista-form/instrumentista-form.component')
              },
              {
                path: ':id/edit',
                loadComponent: () => import('./features/personal/instrumentista/form/instrumentista-form/instrumentista-form.component')
              }
            ]
          },
          // Circulantes
          {
            path: 'circulantes',
            children: [
              {
                path: '',
                loadComponent: () => import('./features/personal/circulante/list/circulante-list/circulante-list.component')
              },
              {
                path: 'new',
                loadComponent: () => import('./features/personal/circulante/form/circulante-form/circulante-form.component')
              },
              {
                path: ':id/edit',
                loadComponent: () => import('./features/personal/circulante/form/circulante-form/circulante-form.component')
              }
            ]
          }
        ]
      },
      // Personal de Apoyo
      {
        path: 'apoyo',
        children: [
          // Residentes
          {
            path: 'residentes',
            children: [
              {
                path: '',
                loadComponent: () => import('./features/apoyo/residente/list/residente-list/residente-list.component')
              },
              {
                path: 'new',
                loadComponent: () => import('./features/apoyo/residente/form/residente-form/residente-form.component')
              },
              {
                path: ':id/edit',
                loadComponent: () => import('./features/apoyo/residente/form/residente-form/residente-form.component')
              }
            ]
          },
          // Internos
          {
            path: 'internos',
            children: [
              {
                path: '',
                loadComponent: () => import('./features/apoyo/interno/list/interno-list/interno-list.component')
              },
              {
                path: 'new',
                loadComponent: () => import('./features/apoyo/interno/form/interno-form/interno-form.component')
              },
              {
                path: ':id/edit',
                loadComponent: () => import('./features/apoyo/interno/form/interno-form/interno-form.component')
              }
            ]
          },
          // Externos
          {
            path: 'externos',
            children: [
              {
                path: '',
                loadComponent: () => import('./features/apoyo/externo/list/externo-list/externo-list.component')
              },
              {
                path: 'new',
                loadComponent: () => import('./features/apoyo/externo/form/externo-form/externo-form.component')
              },
              {
                path: ':id/edit',
                loadComponent: () => import('./features/apoyo/externo/form/externo-form/externo-form.component')
              }
            ]
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
