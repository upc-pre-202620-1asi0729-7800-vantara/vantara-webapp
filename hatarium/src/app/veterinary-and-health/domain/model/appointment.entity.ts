export class Appointment {
  /** Identificador único de la cita. */
  id: string;
  /** Identificador del ganadero asignado. */
  rancherId: string;
  /** Identificador del veterinario asignado. */
  veterinarianId: string;
  /** Identificador de quien solicitó la cita. */
  requestedBy: string;
  /** Fecha y hora programada (ISO-8601). */
  scheduledAt: string;
  /** Motivo de la atención médica. */
  reason: string;
  /** Estado de la cita (p. ej. scheduled, completed, cancelled). */
  status: string;
  /** Motivo de cancelación en caso aplique. */
  cancellationReason: string;
  /** Fecha de creación del registro. */
  createdAt: string;


  constructor() {
    this.id = '';
    this.rancherId = '';
    this.veterinarianId = '';
    this.requestedBy = '';
    this.scheduledAt = '';
    this.reason = '';
    this.status = '';
    this.cancellationReason = '';
    this.createdAt = '';
  }
}
