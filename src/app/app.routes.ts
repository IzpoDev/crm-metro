import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/crm/components/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'crm/afiliar',
    loadComponent: () => import('./features/crm/components/afiliar-cliente/afiliar-cliente.component').then(m => m.AfiliarClienteComponent)
  },
  {
    path: 'crm/actualizar',
    loadComponent: () => import('./features/crm/components/actualizar-cliente/actualizar-cliente.component').then(m => m.ActualizarClienteComponent)
  },
  {
    path: 'crm/notificar',
    loadComponent: () => import('./features/crm/components/notificar-oferta/notificar-oferta.component').then(m => m.NotificarOfertaComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
