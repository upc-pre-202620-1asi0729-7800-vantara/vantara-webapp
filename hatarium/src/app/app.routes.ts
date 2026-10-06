import { Routes } from '@angular/router';
import {
  AppointmentCalendarComponent
} from './veterinary-and-health/presentation/components/appointment-calendar/appointment-calendar';
import {
  ClinicalHistoryComponent
} from './veterinary-and-health/presentation/components/clinical-history/clinical-history';
import {TreatmentListComponent} from './veterinary-and-health/presentation/components/treatment-list/treatment-list';
import {
  AppointmentDetailComponent
} from './veterinary-and-health/presentation/components/appointment-detail/appointment-detail';
import {VaccineRecordComponent} from './veterinary-and-health/presentation/components/vaccine-record/vaccine-record';
import {
  AppointmentFormComponent
} from './veterinary-and-health/presentation/components/appointment-form/appointment-form';

export const routes: Routes = [
// 1. Dashboard principal con filtros por origen (Solicitud Ganadero vs Visita Técnica)
  { path: 'veterinary/appointments', component: AppointmentCalendarComponent },

  // 2. Formulario dedicado para Agendar Nueva Visita Técnica / Cita (US027)
  { path: 'veterinary/appointments/new', component: AppointmentFormComponent },

  // 3. Ficha detallada de la Cita seleccionada
  { path: 'veterinary/appointments/:id', component: AppointmentDetailComponent },

  // 4. Formulario de Registrar Diagnóstico Clínico (US028)
  { path: 'veterinary/history/new', component: ClinicalHistoryComponent },

  // 5. Formulario de Prescribir Tratamiento Médico (US029)
  { path: 'veterinary/treatments/new', component: TreatmentListComponent },

  // 6. Formulario de Registrar Vacuna Aplicada (Opcional)
  { path: 'veterinary/vaccines/new', component: VaccineRecordComponent },

  // Ruta por defecto
  { path: '', redirectTo: 'veterinary/appointments', pathMatch: 'full' }

];
