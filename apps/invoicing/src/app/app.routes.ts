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
    children: [
      {
        path: 'process-pre-invoice/shipping/daily-data',
        loadComponent: () =>
          import('@invoicing/process-pre-invoice').then(
            (m) => m.DailyDataComponent,
          ),
      },
      {
        path: 'process-pre-invoice/shipping/generate-pre-invoice',
        loadComponent: () =>
          import('@invoicing/process-pre-invoice').then(
            (m) => m.GeneratePreInvoiceComponent,
          ),
      },
    ],
  },
];
