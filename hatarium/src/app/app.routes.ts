import { Routes } from '@angular/router';
import { Layout } from './shared/presentation/components/layout/layout';
import { SubscriptionPaymentView } from './payments/presentation/views/subscription-payment-view/subscription-payment-view';

export const routes: Routes = [
  { path: 'suscripcion', component: SubscriptionPaymentView },
  {
    path: 'config/payments',
    component: Layout,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./payments/presentation/payments.routes').then(m => m.paymentsRoutes)
      }
    ]
  },
  { path: '', redirectTo: 'suscripcion', pathMatch: 'full' }
];
