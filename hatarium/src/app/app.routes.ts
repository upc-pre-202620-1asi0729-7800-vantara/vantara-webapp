import { Routes } from '@angular/router';
import {
  AppointmentCalendarComponent
} from './veterinary-and-health/presentation/components/appointment-calendar/appointment-calendar';
import {
  ClinicalHistoryComponent
} from './veterinary-and-health/presentation/components/clinical-history/clinical-history';
import {TreatmentListComponent} from './veterinary-and-health/presentation/components/treatment-list/treatment-list';

export const routes: Routes = [
  { path: 'veterinary/appointments', component: AppointmentCalendarComponent },
  { path: 'veterinary/history', component: ClinicalHistoryComponent },
  { path: 'veterinary/treatments', component: TreatmentListComponent },
  { path: '', redirectTo: 'veterinary/appointments', pathMatch: 'full' }

];
