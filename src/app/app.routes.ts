import { Routes } from '@angular/router';
import { NetworkStatusComponent } from './core/pages/content/network-status/network-status.component';
import { ErrorComponent } from './core/pages/content/error/error.component';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('../app/core/pages/auth/authentication.module').then(m => m.AuthenticationModule),
  },
  {
    path: 'dashboard',
    loadChildren: () => import('../app/core/pages/client/client.module').then(m => m.ClientModule),
  },
  {
    path: 'error/page-not-found',
    component: ErrorComponent
  },
  {
    path: 'offline',
    component: NetworkStatusComponent
  },
  {
    path: '',
    loadChildren: () => import('../app/core/pages/content/content.module').then(m => m.ContentModule),
  },
  {
    path: '**', // This should be the last route
    redirectTo: 'error/page-not-found'
  }
];
