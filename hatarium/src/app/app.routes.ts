import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'config/payments',
    loadChildren: () =>
      import('./payments/presentation/payments.routes').then(m => m.paymentsRoutes)
  },
  { path: '', redirectTo: 'config/payments', pathMatch: 'full' }
];
