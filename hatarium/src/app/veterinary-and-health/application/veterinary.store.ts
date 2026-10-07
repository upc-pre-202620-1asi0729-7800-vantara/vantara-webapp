import { computed, inject, Injectable, signal } from '@angular/core';
import { Appointment } from '../domain/model/appointment.entity';
import { MedicalRecord } from '../domain/model/medical-record.entity';
import { Treatment } from '../domain/model/treatment.entity';
import { VeterinaryApiClient } from '../infrastructure/veterinary-api-client';

@Injectable({
  providedIn: 'root'
})
export class VeterinaryStore {
  private api = inject(VeterinaryApiClient);

  // Signals privados (protegidos contra modificaciones externas)
  private appointmentsSignal = signal<Appointment[]>([]);
  private recordsSignal = signal<MedicalRecord[]>([]);
  private treatmentsSignal = signal<Treatment[]>([]);
  private selectedAnimalIdSignal = signal<string>('');
  private loadingSignal = signal<boolean>(false);
  private errorMessageSignal = signal<string>('');

  // Proyecciones de solo lectura consumidas por los componentes
  readonly appointments = computed(() => this.appointmentsSignal());
  readonly records = computed(() => this.recordsSignal());
  readonly treatments = computed(() => this.treatmentsSignal());
  readonly selectedAnimalId = computed(() => this.selectedAnimalIdSignal());
  readonly loading = computed(() => this.loadingSignal());
  readonly errorMessage = computed(() => this.errorMessageSignal());

  /** Carga las citas médicas desde la API */
  public loadAppointments(): void {
    this.loadingSignal.set(true);
    this.api.getAppointments().subscribe({
      next: (data) => {
        this.appointmentsSignal.set(data);
        this.loadingSignal.set(false);
      },
      error: () => {
        this.errorMessageSignal.set('Error al cargar citas médicas');
        this.loadingSignal.set(false);
      }
    });
  }

  /** Carga las historias clínicas desde la API */
  public loadMedicalRecords(): void {
    this.loadingSignal.set(true);
    this.api.getMedicalRecords().subscribe({
      next: (data) => {
        this.recordsSignal.set(data);
        this.loadingSignal.set(false);
      },
      error: () => {
        this.errorMessageSignal.set('Error al cargar historias clínicas');
        this.loadingSignal.set(false);
      }
    });
  }

  /** Carga los tratamientos desde la API */
  public loadTreatments(): void {
    this.loadingSignal.set(true);
    this.api.getTreatments().subscribe({
      next: (data) => {
        this.treatmentsSignal.set(data);
        this.loadingSignal.set(false);
      },
      error: () => {
        this.errorMessageSignal.set('Error al cargar tratamientos');
        this.loadingSignal.set(false);
      }
    });
  }

  /** Registra una nueva cita médica (US027) */
  public createAppointment(appointment: Partial<Appointment>): void {
    this.loadingSignal.set(true);
    this.api.createAppointment(appointment).subscribe({
      next: (newAppointment) => {
        this.appointmentsSignal.update((list) => [...list, newAppointment]);
        this.loadingSignal.set(false);
      },
      error: () => {
        this.errorMessageSignal.set('Error al registrar la cita');
        this.loadingSignal.set(false);
      }
    });
  }

  /** Registra una nueva historia clínica / diagnóstico (US028) */
  public createMedicalRecord(record: Partial<MedicalRecord>): void {
    this.loadingSignal.set(true);
    this.api.createMedicalRecord(record).subscribe({
      next: (newRecord) => {
        this.recordsSignal.update((list) => [...list, newRecord]);
        this.loadingSignal.set(false);
      },
      error: () => {
        this.errorMessageSignal.set('Error al registrar la historia clínica');
        this.loadingSignal.set(false);
      }
    });
  }

  public createTreatment(treatment: Partial<Treatment>): void {
    this.loadingSignal.set(true);
    this.api.createTreatment(treatment).subscribe({
      next: (newTreatment) => {
        this.treatmentsSignal.update((list) => [...list, newTreatment]);
        this.loadingSignal.set(false);
      },
      error: () => {
        this.errorMessageSignal.set('Error al registrar el tratamiento');
        this.loadingSignal.set(false);
      }
    });
  }
}
