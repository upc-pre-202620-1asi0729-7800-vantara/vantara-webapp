import { computed, inject, Injectable, signal } from '@angular/core';
import { Observable, catchError, finalize, tap, throwError } from 'rxjs';
import { Appointment } from '../domain/model/appointment.entity';
import { MedicalRecord } from '../domain/model/medical-record.entity';
import { Treatment } from '../domain/model/treatment.entity';
import { VeterinaryApiClient } from '../infrastructure/veterinary-api-client';

/**
 * Reactive application store for the veterinary bounded context.
 * Components only read the exposed signals and call the use-case methods.
 */
@Injectable({
  providedIn: 'root'
})
export class VeterinaryStore {
  private api = inject(VeterinaryApiClient);

  private appointmentsSignal = signal<Appointment[]>([]);
  private recordsSignal = signal<MedicalRecord[]>([]);
  private treatmentsSignal = signal<Treatment[]>([]);
  private selectedAnimalIdSignal = signal<string>('');
  private loadingSignal = signal<boolean>(false);
  private errorMessageSignal = signal<string>('');

  readonly appointments = computed(() => this.appointmentsSignal());
  readonly records = computed(() => this.recordsSignal());
  readonly treatments = computed(() => this.treatmentsSignal());
  readonly selectedAnimalId = computed(() => this.selectedAnimalIdSignal());
  readonly loading = computed(() => this.loadingSignal());
  readonly errorMessage = computed(() => this.errorMessageSignal());

  selectAnimal(animalId: string): void {
    this.selectedAnimalIdSignal.set(animalId);
  }

  clearError(): void {
    this.errorMessageSignal.set('');
  }

  /** Loads every appointment registered in the fake API. */
  loadAppointments(): void {
    this.loadingSignal.set(true);
    this.errorMessageSignal.set('');
    this.api.getAppointments().subscribe({
      next: data => {
        this.appointmentsSignal.set(data);
        this.loadingSignal.set(false);
      },
      error: () => {
        this.errorMessageSignal.set('No se pudieron cargar las citas médicas.');
        this.loadingSignal.set(false);
      }
    });
  }

  /** Loads every clinical record registered in the fake API. */
  loadMedicalRecords(): void {
    this.loadingSignal.set(true);
    this.errorMessageSignal.set('');
    this.api.getMedicalRecords().subscribe({
      next: data => {
        this.recordsSignal.set(data);
        this.loadingSignal.set(false);
      },
      error: () => {
        this.errorMessageSignal.set('No se pudieron cargar las historias clínicas.');
        this.loadingSignal.set(false);
      }
    });
  }

  /** Loads every treatment registered in the fake API. */
  loadTreatments(): void {
    this.loadingSignal.set(true);
    this.errorMessageSignal.set('');
    this.api.getTreatments().subscribe({
      next: data => {
        this.treatmentsSignal.set(data);
        this.loadingSignal.set(false);
      },
      error: () => {
        this.errorMessageSignal.set('No se pudieron cargar los tratamientos.');
        this.loadingSignal.set(false);
      }
    });
  }

  /** US027 - Registers a new appointment / technical visit. */
  createAppointment(appointment: Partial<Appointment>): Observable<Appointment> {
    this.loadingSignal.set(true);
    this.errorMessageSignal.set('');
    return this.api.createAppointment(appointment).pipe(
      tap(created => this.appointmentsSignal.update(list => [...list, created])),
      catchError(error => {
        this.errorMessageSignal.set('No se pudo registrar la cita médica.');
        return throwError(() => error);
      }),
      finalize(() => this.loadingSignal.set(false))
    );
  }

  /** US028 - Registers a clinical diagnosis. */
  createMedicalRecord(record: Partial<MedicalRecord>): Observable<MedicalRecord> {
    this.loadingSignal.set(true);
    this.errorMessageSignal.set('');
    return this.api.createMedicalRecord(record).pipe(
      tap(created => this.recordsSignal.update(list => [...list, created])),
      catchError(error => {
        this.errorMessageSignal.set('No se pudo registrar el diagnóstico clínico.');
        return throwError(() => error);
      }),
      finalize(() => this.loadingSignal.set(false))
    );
  }

  /** US029 - Prescribes a medical treatment. */
  createTreatment(treatment: Partial<Treatment>): Observable<Treatment> {
    this.loadingSignal.set(true);
    this.errorMessageSignal.set('');
    return this.api.createTreatment(treatment).pipe(
      tap(created => this.treatmentsSignal.update(list => [...list, created])),
      catchError(error => {
        this.errorMessageSignal.set('No se pudo registrar el tratamiento.');
        return throwError(() => error);
      }),
      finalize(() => this.loadingSignal.set(false))
    );
  }
}
