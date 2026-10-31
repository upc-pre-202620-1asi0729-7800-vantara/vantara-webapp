import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';
import { AppointmentAnimal } from '../domain/model/appointment-animal.entity';
import { Appointment } from '../domain/model/appointment.entity';
import { MedicalRecord } from '../domain/model/medical-record.entity';
import { Treatment } from '../domain/model/treatment.entity';
import { environment } from '../../../environments/environment';
import { VeterinaryApiMapper } from './veterinary-api-mapper';
import {
  AppointmentResource,
  MedicalRecordResource,
  TreatmentResource
} from './veterinary-response';

export type AnimalAppointment = Appointment & { veterinarianName: string | null };

/**
 * Write/read gateway for the aggregates owned by the veterinary context:
 * appointments, clinical records and treatments.
 */
@Injectable({ providedIn: 'root' })
export class VeterinaryApiClient {
  private http = inject(HttpClient);
  private baseUrl = environment.hatariumApiBaseUrl;

  getAppointments(): Observable<Appointment[]> {
    return this.http
      .get<AppointmentResource[]>(`${this.baseUrl}/appointments`)
      .pipe(map(resources => resources.map(VeterinaryApiMapper.toAppointmentEntity)));
  }

  getAppointmentById(appointmentId: string): Observable<Appointment> {
    return this.http
      .get<AppointmentResource>(`${this.baseUrl}/appointments/${appointmentId}`)
      .pipe(map(VeterinaryApiMapper.toAppointmentEntity));
  }

  getAppointmentsByAnimal(animalId: string): Observable<AnimalAppointment[]> {
    return forkJoin({
      relations: this.http.get<AppointmentAnimal[]>(`${this.baseUrl}/appointmentAnimals`, { params: { animalId } }),
      appointments: this.getAppointments(),
      users: this.http.get<{ id: string; fullName: string }[]>(`${this.baseUrl}/users`),
    }).pipe(map(({ relations, appointments, users }) => {
      const ids = new Set(relations.filter(relation => relation.animalId === animalId).map(relation => relation.appointmentId));
      const veterinarians = new Map(users.map(user => [user.id, user.fullName]));
      const unique = new Map(appointments.filter(appointment => ids.has(appointment.id)).map(appointment => [appointment.id, appointment]));
      const now = Date.now();
      return [...unique.values()].map(appointment => ({
        ...appointment, veterinarianName: veterinarians.get(appointment.veterinarianId) || null,
      })).sort((a, b) => {
        const first = new Date(a.scheduledAt).getTime() || 0;
        const second = new Date(b.scheduledAt).getTime() || 0;
        if ((first >= now) !== (second >= now)) return first >= now ? -1 : 1;
        return first >= now ? first - second : second - first;
      });
    }));
  }

  createAppointment(appointment: Partial<Appointment>): Observable<Appointment> {
    return this.http
      .post<AppointmentResource>(`${this.baseUrl}/appointments`, appointment)
      .pipe(map(VeterinaryApiMapper.toAppointmentEntity));
  }

  getMedicalRecords(): Observable<MedicalRecord[]> {
    return this.http
      .get<MedicalRecordResource[]>(`${this.baseUrl}/medicalRecords`)
      .pipe(map(resources => resources.map(VeterinaryApiMapper.toMedicalRecordEntity)));
  }

  getMedicalRecordsByAnimal(animalId: string): Observable<MedicalRecord[]> {
    return this.http
      .get<MedicalRecordResource[]>(`${this.baseUrl}/medicalRecords`, { params: { animalId } })
      .pipe(map(resources => resources.map(VeterinaryApiMapper.toMedicalRecordEntity)));
  }

  createMedicalRecord(record: Partial<MedicalRecord>): Observable<MedicalRecord> {
    return this.http
      .post<MedicalRecordResource>(`${this.baseUrl}/medicalRecords`, record)
      .pipe(map(VeterinaryApiMapper.toMedicalRecordEntity));
  }

  getTreatments(): Observable<Treatment[]> {
    return this.http
      .get<TreatmentResource[]>(`${this.baseUrl}/treatments`)
      .pipe(map(resources => resources.map(VeterinaryApiMapper.toTreatmentEntity)));
  }

  getTreatmentsByAnimal(animalId: string): Observable<Treatment[]> {
    return this.http
      .get<TreatmentResource[]>(`${this.baseUrl}/treatments`, { params: { animalId } })
      .pipe(map(resources => resources.map(VeterinaryApiMapper.toTreatmentEntity)));
  }

  createTreatment(treatment: Partial<Treatment>): Observable<Treatment> {
    return this.http
      .post<TreatmentResource>(`${this.baseUrl}/treatments`, treatment)
      .pipe(map(VeterinaryApiMapper.toTreatmentEntity));
  }
}
