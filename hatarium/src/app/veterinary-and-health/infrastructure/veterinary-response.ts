export interface AppointmentResource {
  id: string;
  rancherId: string;
  veterinarianId: string;
  requestedBy: string;
  scheduledAt: string;
  reason: string;
  status: string;
  cancellationReason?: string | null;
  createdAt?: string;
}

export interface MedicalRecordResource {
  id: string;
  appointmentId?: string | null;
  animalId: string;
  veterinarianId: string;
  recordedAt: string;
  symptoms: string;
  diagnosis: string;
  severity: string;
  healthStatus: string;
  notes?: string;
}

export interface TreatmentResource {
  id: string;
  medicalRecordId: string;
  animalId: string;
  medicationId: string;
  treatmentType: string;
  dose: string;
  doseUnit: string;
  route: string;
  frequencyHours: string;
  durationDays: number;
  scheduledAt: string;
  status: string;
  instructions?: string;
  administeredAt?: string | null;
  nextDueAt?: string | null;
}
