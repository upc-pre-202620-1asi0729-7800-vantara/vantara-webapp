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
  /** Nivel de severidad (p. ej. low, medium, high). */
  severity: string;
  /** Estado de salud resultante. */
  healthStatus: string;
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
    this.severity = '';
    this.healthStatus = '';
    this.notes = '';
  }


}
