import { Routes } from '@angular/router';
import { Layout } from './shared/presentation/components/layout/layout';
import { SubscriptionPaymentView } from './payments/presentation/views/subscription-payment-view/subscription-payment-view';
import { AnimalList } from './livestock-management/presentation/components/animal-list/animal-list';
import { AnimalAdd } from './livestock-management/presentation/components/animal-add/animal-add';
import { AnimalDetail } from './livestock-management/presentation/components/animal-detail/animal-detail';
import { FeedingDashboard } from './livestock-management/presentation/components/feeding-dashboard/feeding-dashboard';
import { FeedingPlanDetail } from './livestock-management/presentation/components/feeding-plan-detail/feeding-plan-detail';
import { FeedingPlanCreate } from './livestock-management/presentation/components/feeding-plan-add/feeding-plan-add';
import { HomeView } from './home/presentation/home-view/home-view';
import { ProfileView } from './profile/presentation/profile-view/profile-view';
import { NotificationCenterView } from './notifications/presentation/notification-center-view/notification-center-view';
import { AppointmentCalendarComponent } from './veterinary-and-health/presentation/components/appointment-calendar/appointment-calendar';
import { ClinicalHistoryComponent } from './veterinary-and-health/presentation/components/clinical-history/clinical-history';
import { TreatmentListComponent } from './veterinary-and-health/presentation/components/treatment-list/treatment-list';
import { AppointmentDetailComponent } from './veterinary-and-health/presentation/components/appointment-detail/appointment-detail';
import { VaccineRecordComponent } from './veterinary-and-health/presentation/components/vaccine-record/vaccine-record';
import { AppointmentFormComponent } from './veterinary-and-health/presentation/components/appointment-form/appointment-form';
import {ReportsDashboard} from './reports/presentation/components/reports-dashboard/reports-dashboard';
import {ReportsResults} from './reports/presentation/components/reports-results/reports-results';

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
      { path: 'home', component: HomeView },
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
      { path: 'notifications', component: NotificationCenterView },
      { path: 'veterinary/appointments', component: AppointmentCalendarComponent },
      { path: 'veterinary/appointments/new', component: AppointmentFormComponent },
      { path: 'veterinary/appointments/:id', component: AppointmentDetailComponent },
      { path: 'veterinary/history/new', component: ClinicalHistoryComponent },
      { path: 'veterinary/treatments/new', component: TreatmentListComponent },
      { path: 'veterinary/vaccines/new', component: VaccineRecordComponent },
      { path: 'reports', component: ReportsDashboard },
      { path: 'reports/results',  component: ReportsResults },
      {
        path: 'config/payments',
        loadChildren: () =>
          import('./payments/presentation/payments.routes').then(m => m.paymentsRoutes)
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },
  { path: '', pathMatch: 'full', redirectTo: 'iam/sign-in' },
  { path: '**', redirectTo: 'iam/sign-in' }
];
