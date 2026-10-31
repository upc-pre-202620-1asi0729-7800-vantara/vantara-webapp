/** Severity levels accepted by the clinical history aggregate. */
export type MedicalRecordSeverity = 'low' | 'medium' | 'high';

/** Health outcome derived from the clinical diagnosis. */
export type AnimalHealthStatus = 'healthy' | 'follow_up' | 'critical';

export class MedicalRecord {
  /** Identificador único de la historia clínica. */
  id: string;
  /** Identificador de la cita vinculada (opcional). */
  appointmentId: string;
  /** Identificador del animal atendido. */
  animalId: string;
  /** Identificador del veterinario que realizó la atención. */
  veterinarianId: string;
  /** Fecha del registro médico. */
  recordedAt: string;
  /** Síntomas identificados. */
  symptoms: string;
  /** Diagnóstico emitido. */
  diagnosis: string;
  /** Nivel de severidad (low, medium, high). */
  severity: MedicalRecordSeverity;
  /** Estado de salud resultante. */
  healthStatus: AnimalHealthStatus;
  /** Notas u observaciones adicionales. */
  notes: string;

  constructor() {
    this.id = '';
    this.appointmentId = '';
    this.animalId = '';
    this.veterinarianId = '';
    this.recordedAt = '';
    this.symptoms = '';
    this.diagnosis = '';
    this.severity = 'low';
    this.healthStatus = 'healthy';
    this.notes = '';
  }
}
