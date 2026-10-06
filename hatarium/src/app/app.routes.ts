import { Routes } from '@angular/router';
import { Layout } from './shared/presentation/components/layout/layout';
import { SubscriptionPaymentView } from './payments/presentation/views/subscription-payment-view/subscription-payment-view';

export const routes: Routes = [
  {
    path: 'iam',
    loadChildren: () => import('./iam/presentation/iam.routes').then(module => module.iamRoutes)
  },
  { path: 'suscripcion', component: SubscriptionPaymentView },
  {
    path: '',
    component: Layout,
    children: [
      {
        path: 'reproductive',
        loadChildren: () =>
          import('./reproductive/presentation/reproductive.routes').then(m => m.reproductiveRoutes)
      },
      {
        path: 'config/payments',
        loadChildren: () =>
          import('./payments/presentation/payments.routes').then(m => m.paymentsRoutes)
      },
      { path: '', redirectTo: 'reproductive', pathMatch: 'full' }
    ]
  },
  { path: '', pathMatch: 'full', redirectTo: 'iam/sign-in' },
  { path: '**', redirectTo: 'iam/sign-in' }
];
