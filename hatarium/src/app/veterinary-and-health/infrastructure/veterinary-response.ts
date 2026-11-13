import {AppointmentOrigin} from '../domain/model/appointment.entity';
import {AnimalHealthStatus, MedicalRecordSeverity} from '../domain/model/medical-record.entity';

/** Raw HTTP resource returned by the fake API for an appointment. */
export interface AppointmentResource {
  id: string;
  rancherId: string;
  veterinarianId: string;
  requestedBy: string;
  origin?: AppointmentOrigin | null;
  scheduledAt: string;
  reason: string;
  status: string;
  cancellationReason?: string | null;
  createdAt?: string;
}

/** Raw HTTP resource returned by the fake API for a clinical record. */
export interface MedicalRecordResource {
  id: string;
  appointmentId?: string | null;
  animalId: string;
  veterinarianId: string;
  recordedAt: string;
  symptoms: string;
  diagnosis: string;
  severity: MedicalRecordSeverity;
  healthStatus: AnimalHealthStatus;
  notes?: string;
}

/** Raw HTTP resource returned by the fake API for a treatment. */
export interface TreatmentResource {
  id: string;
  medicalRecordId: string;
  animalId: string;
  medicationId: string;
  treatmentType: string;
  dose: number | string;
  doseUnit: string;
  route: string;
  frequencyHours: number | string;
  durationDays: number;
  scheduledAt: string;
  status: string;
  instructions?: string;
  administeredAt?: string | null;
  nextDate?: string | null;
  nextDueAt?: string | null;
}
