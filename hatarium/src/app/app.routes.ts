import { Routes } from '@angular/router';
import { Layout } from './shared/presentation/components/layout/layout';
import { SubscriptionPaymentView } from './payments/presentation/views/subscription-payment-view/subscription-payment-view';
import { AnimalList } from './livestock-management/presentation/components/animal-list/animal-list';
import { AnimalAdd } from './livestock-management/presentation/components/animal-add/animal-add';
import { AnimalDetail } from './livestock-management/presentation/components/animal-detail/animal-detail';
import { FeedingDashboard } from './livestock-management/presentation/components/feeding-dashboard/feeding-dashboard';
import { FeedingPlanDetail } from './livestock-management/presentation/components/feeding-plan-detail/feeding-plan-detail';
import { FeedingPlanCreate } from './livestock-management/presentation/components/feeding-plan-add/feeding-plan-add';
import { Home } from './shared/presentation/views/home/home';
import { ProfileView } from './profile/presentation/profile-view/profile-view';
import { NotificationCenterView } from './notifications/presentation/notification-center-view/notification-center-view';
import { RancherAppointmentsComponent } from './veterinary-and-health/presentation/components/rancher-appointments/rancher-appointments';
import { VeterinaryDashboardComponent } from './veterinary-and-health/presentation/components/veterinary-dashboard/veterinary-dashboard';
import { SanitaryHistoryComponent } from './veterinary-and-health/presentation/components/sanitary-history/sanitary-history';
import { VaccineCenterComponent } from './veterinary-and-health/presentation/components/vaccine-center/vaccine-center';
import { VeterinaryReportsComponent } from './veterinary-and-health/presentation/components/veterinary-reports/veterinary-reports';
import { ClinicalHistoryComponent } from './veterinary-and-health/presentation/components/clinical-history/clinical-history';
import { TreatmentListComponent } from './veterinary-and-health/presentation/components/treatment-list/treatment-list';
import { AppointmentCalendarComponent } from './veterinary-and-health/presentation/components/appointment-calendar/appointment-calendar';
import { AppointmentDetailComponent } from './veterinary-and-health/presentation/components/appointment-detail/appointment-detail';
import { VaccineRecordComponent } from './veterinary-and-health/presentation/components/vaccine-record/vaccine-record';
import { AppointmentFormComponent } from './veterinary-and-health/presentation/components/appointment-form/appointment-form';
import {ReportsDashboard} from './reports/presentation/components/reports-dashboard/reports-dashboard';
import {ReportsResults} from './reports/presentation/components/reports-results/reports-results';
import {authGuard} from './shared/presentation/guards/auth.guard';
import {veterinarianGuard} from './shared/presentation/guards/role.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'iam/sign-in' },
  {
    path: 'iam',
    loadChildren: () => import('./iam/presentation/iam.routes').then(module => module.iamRoutes)
  },
  { path: 'suscripcion', component: SubscriptionPaymentView },
  {
    path: '',
    component: Layout,
    canActivate: [authGuard],
    children: [
      { path: 'home', component: Home },
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
      { path: 'rancher/appointments', component: RancherAppointmentsComponent },
      { path: 'profile', component: ProfileView },
      { path: 'notifications', component: NotificationCenterView },
      { path: 'veterinary/dashboard', component: VeterinaryDashboardComponent, canActivate: [veterinarianGuard] },
      { path: 'veterinary/appointments', component: AppointmentCalendarComponent, canActivate: [veterinarianGuard] },
      { path: 'veterinary/appointments/new', component: AppointmentFormComponent, canActivate: [veterinarianGuard] },
      { path: 'veterinary/appointments/:id', component: AppointmentDetailComponent, canActivate: [veterinarianGuard] },
      { path: 'veterinary/history/new', component: ClinicalHistoryComponent, canActivate: [veterinarianGuard] },
      { path: 'veterinary/treatments/new', component: TreatmentListComponent, canActivate: [veterinarianGuard] },
      { path: 'veterinary/vaccines', component: VaccineCenterComponent, canActivate: [veterinarianGuard] },
      { path: 'veterinary/vaccines/new', component: VaccineRecordComponent, canActivate: [veterinarianGuard] },
      { path: 'veterinary/records', component: SanitaryHistoryComponent, canActivate: [veterinarianGuard] },
      { path: 'veterinary/reports', component: VeterinaryReportsComponent, canActivate: [veterinarianGuard] },
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
  { path: '**', redirectTo: 'iam/sign-in' }
];
