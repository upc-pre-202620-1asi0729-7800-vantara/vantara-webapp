import { Routes } from '@angular/router';
import { Layout } from './shared/presentation/components/layout/layout';
import { SubscriptionPaymentView } from './payments/presentation/views/subscription-payment-view/subscription-payment-view';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: 'suscripcion', component: SubscriptionPaymentView },
      {
        path: 'config/payments',
        loadChildren: () =>
          import('./payments/presentation/payments.routes').then(m => m.paymentsRoutes)
      },
      { path: '', redirectTo: 'config/payments', pathMatch: 'full' }
    ]
  }
];
