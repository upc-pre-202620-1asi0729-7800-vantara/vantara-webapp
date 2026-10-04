export class AppointmentAnimal {
  /** Identificador único del registro de relación. */
  id: string;
  /** Identificador de la cita asociada. */
  appointmentId: string;
  /** Identificador del animal asociado a la cita. */
  animalId: string;

  constructor() {
    this.id = '';
    this.appointmentId = '';
    this.animalId = '';
  }

}
