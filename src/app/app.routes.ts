import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/auth/components/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./features/crm/components/home/home.component').then(m => m.HomeComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'crm/afiliar',
    loadComponent: () => import('./features/crm/components/afiliar-cliente/afiliar-cliente.component').then(m => m.AfiliarClienteComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'crm/actualizar',
    loadComponent: () => import('./features/crm/components/actualizar-cliente/actualizar-cliente.component').then(m => m.ActualizarClienteComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'crm/notificar',
    loadComponent: () => import('./features/crm/components/notificar-oferta/notificar-oferta.component').then(m => m.NotificarOfertaComponent),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
