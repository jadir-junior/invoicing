import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'auth-response',
    redirectTo: '/',
  },
  {
    path: '',
    loadComponent: () =>
      import('@invoicing/admin').then((m) => m.AdminComponent),
  },
];
