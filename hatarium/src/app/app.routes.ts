
import { Routes } from '@angular/router';
import { Layout } from './shared/presentation/components/layout/layout';
import { authGuard } from './shared/presentation/guards/auth.guard';
import { veterinarianGuard } from './shared/presentation/guards/role.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'iam/sign-in' },

  {
    path: 'iam',
    loadChildren: () =>
      import('./iam/presentation/iam.routes').then(m => m.iamRoutes)
  },

  {
    path: 'suscripcion',
    loadComponent: () =>
      import('./payments/presentation/views/subscription-payment-view/subscription-payment-view')
        .then(m => m.SubscriptionPaymentView)
  },

  {
    path: '',
    component: Layout,
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./shared/presentation/views/home/home')
            .then(m => m.Home)
      },

      {
        path: 'reproductive',
        loadChildren: () =>
          import('./reproductive/presentation/reproductive.routes')
            .then(m => m.reproductiveRoutes)
      },

      {
        path: 'livestock/animals',
        loadComponent: () =>
          import('./livestock-management/presentation/components/animal-list/animal-list')
            .then(m => m.AnimalList)
      },
      {
        path: 'livestock/lots',
        loadComponent: () =>
          import('./livestock-management/presentation/components/lot-list/lot-list')
            .then(m => m.LotList)
      },
      {
        path: 'livestock/animals/add',
        loadComponent: () =>
          import('./livestock-management/presentation/components/animal-add/animal-add')
            .then(m => m.AnimalAdd)
      },
      {
        path: 'livestock/animals/:id',
        loadComponent: () =>
          import('./livestock-management/presentation/components/animal-detail/animal-detail')
            .then(m => m.AnimalDetail)
      },
      {
        path: 'livestock/feeding',
        loadComponent: () =>
          import('./livestock-management/presentation/components/feeding-dashboard/feeding-dashboard')
            .then(m => m.FeedingDashboard)
      },
      {
        path: 'livestock/feeding/add',
        loadComponent: () =>
          import('./livestock-management/presentation/components/feeding-plan-add/feeding-plan-add')
            .then(m => m.FeedingPlanCreate)
      },
      {
        path: 'livestock/feeding/:id',
        loadComponent: () =>
          import('./livestock-management/presentation/components/feeding-plan-detail/feeding-plan-detail')
            .then(m => m.FeedingPlanDetail)
      },

      {
        path: 'rancher/appointments',
        loadComponent: () =>
          import('./veterinary-and-health/presentation/components/rancher-appointments/rancher-appointments')
            .then(m => m.RancherAppointmentsComponent)
      },
      {
        path: 'rancher/appointments/new',
        loadComponent: () =>
          import('./veterinary-and-health/presentation/components/rancher-appointment-form/rancher-appointment-form')
            .then(m => m.RancherAppointmentFormComponent)
      },

      {
        path: 'profile',
        loadComponent: () =>
          import('./profile/presentation/profile-view/profile-view')
            .then(m => m.ProfileView)
      },
      {
        path: 'notifications',
        loadComponent: () =>
          import('./notifications/presentation/notification-center-view/notification-center-view')
            .then(m => m.NotificationCenterView)
      },

      {
        path: 'veterinary/dashboard',
        loadComponent: () =>
          import('./veterinary-and-health/presentation/components/veterinary-dashboard/veterinary-dashboard')
            .then(m => m.VeterinaryDashboardComponent),
        canActivate: [veterinarianGuard]
      },
      {
        path: 'veterinary/appointments',
        loadComponent: () =>
          import('./veterinary-and-health/presentation/components/appointment-calendar/appointment-calendar')
            .then(m => m.AppointmentCalendarComponent),
        canActivate: [veterinarianGuard]
      },
      {
        path: 'veterinary/appointments/new',
        loadComponent: () =>
          import('./veterinary-and-health/presentation/components/appointment-form/appointment-form')
            .then(m => m.AppointmentFormComponent),
        canActivate: [veterinarianGuard]
      },
      {
        path: 'veterinary/appointments/:id',
        loadComponent: () =>
          import('./veterinary-and-health/presentation/components/appointment-detail/appointment-detail')
            .then(m => m.AppointmentDetailComponent),
        canActivate: [veterinarianGuard]
      },
      {
        path: 'veterinary/history/new',
        loadComponent: () =>
          import('./veterinary-and-health/presentation/components/clinical-history/clinical-history')
            .then(m => m.ClinicalHistoryComponent),
        canActivate: [veterinarianGuard]
      },
      {
        path: 'veterinary/treatments/new',
        loadComponent: () =>
          import('./veterinary-and-health/presentation/components/treatment-list/treatment-list')
            .then(m => m.TreatmentListComponent),
        canActivate: [veterinarianGuard]
      },
      {
        path: 'veterinary/vaccines',
        loadComponent: () =>
          import('./veterinary-and-health/presentation/components/vaccine-center/vaccine-center')
            .then(m => m.VaccineCenterComponent),
        canActivate: [veterinarianGuard]
      },
      {
        path: 'veterinary/vaccines/new',
        loadComponent: () =>
          import('./veterinary-and-health/presentation/components/vaccine-record/vaccine-record')
            .then(m => m.VaccineRecordComponent),
        canActivate: [veterinarianGuard]
      },
      {
        path: 'veterinary/records',
        loadComponent: () =>
          import('./veterinary-and-health/presentation/components/sanitary-history/sanitary-history')
            .then(m => m.SanitaryHistoryComponent),
        canActivate: [veterinarianGuard]
      },
      {
        path: 'veterinary/reports',
        loadComponent: () =>
          import('./veterinary-and-health/presentation/components/veterinary-reports/veterinary-reports')
            .then(m => m.VeterinaryReportsComponent),
        canActivate: [veterinarianGuard]
      },

      {
        path: 'reports',
        loadComponent: () =>
          import('./reports/presentation/components/reports-dashboard/reports-dashboard')
            .then(m => m.ReportsDashboard)
      },
      {
        path: 'reports/results',
        loadComponent: () =>
          import('./reports/presentation/components/reports-results/reports-results')
            .then(m => m.ReportsResults)
      },

      {
        path: 'config/payments',
        loadChildren: () =>
          import('./payments/presentation/payments.routes')
            .then(m => m.paymentsRoutes)
      },

      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },

  { path: '**', redirectTo: 'iam/sign-in' }
];
