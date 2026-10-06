export class Treatment {
  /** Identificador único del tratamiento. */
  id: string;
  /** Identificador de la historia clínica asociada. */
  medicalRecordId: string;
  /** Identificador del animal. */
  animalId: string;
  /** Identificador del medicamento prescrito. */
  medicationId: string;
  /** Tipo de tratamiento (p. ej. Preventivo, Curativo). */
  treatmentType: string;
  /** Cantidad de dosis. */
  dose: string;
  /** Unidad de medida de la dosis (p. ej. ml, mg). */
  doseUnit: string;
  /** Vía de administración (p. ej. Intramuscular). */
  route: string;
  /** Frecuencia de administración en horas. */
  frequencyHours: string;
  /** Duración en días del tratamiento. */
  durationDays: number;
  /** Fecha programada de inicio. */
  scheduledAt: string;
  /** Fecha de administración. */
  administeredAt: string;
  /** Próxima fecha programada. */
  nextDueAt: string;
  /** Estado del tratamiento. */
  status: string;
  /** Instrucciones adicionales. */
  instructions: string;

  constructor() {
    this.id = '';
    this.medicalRecordId = '';
    this.animalId = '';
    this.medicationId = '';
    this.treatmentType = '';
    this.dose = '';
    this.doseUnit = '';
    this.route = '';
    this.frequencyHours = '';
    this.durationDays = 0;
    this.scheduledAt = '';
    this.administeredAt = '';
    this.nextDueAt = '';
    this.status = '';
    this.instructions = '';
  }
}
