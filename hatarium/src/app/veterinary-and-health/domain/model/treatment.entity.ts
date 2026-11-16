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
  dose: number;
  /** Unidad de medida de la dosis (p. ej. ml, mg). */
  doseUnit: string;
  /** Vía de administración (p. ej. Intramuscular). */
  route: string;
  /** Frecuencia de administración en horas. */
  frequencyHours: number;
  /** Duración en días del tratamiento. */
  durationDays: number;
  /** Fecha programada de inicio. */
  scheduledAt: string;
  /** Fecha de administración. */
  administeredAt: string;
  /** Próxima fecha programada. */
  nextDate: string;
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
    this.dose = 0;
    this.doseUnit = '';
    this.route = '';
    this.frequencyHours = 0;
    this.durationDays = 0;
    this.scheduledAt = '';
    this.administeredAt = '';
    this.nextDate = '';
    this.status = '';
    this.instructions = '';
  }
}
