import { Routes } from '@angular/router';
import { Layout } from './shared/presentation/components/layout/layout';
import { SubscriptionPaymentView } from './payments/presentation/views/subscription-payment-view/subscription-payment-view';
import { AnimalList } from './livestock-management/presentation/components/animal-list/animal-list';
import { AnimalAdd } from './livestock-management/presentation/components/animal-add/animal-add';
import { AnimalDetail } from './livestock-management/presentation/components/animal-detail/animal-detail';
import { FeedingDashboard } from './livestock-management/presentation/components/feeding-dashboard/feeding-dashboard';
import { FeedingPlanDetail } from './livestock-management/presentation/components/feeding-plan-detail/feeding-plan-detail';
import { FeedingPlanCreate } from './livestock-management/presentation/components/feeding-plan-add/feeding-plan-add';
import { ProfileView } from './profile/presentation/profile-view/profile-view';

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
      { path: 'livestock/animals', component: AnimalList },
      { path: 'livestock/animals/add', component: AnimalAdd },
      { path: 'livestock/animals/:id', component: AnimalDetail },
      { path: 'livestock/feeding', component: FeedingDashboard },
      { path: 'livestock/feeding/add', component: FeedingPlanCreate },
      { path: 'livestock/feeding/:id', component: FeedingPlanDetail },
      { path: 'profile', component: ProfileView },
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
