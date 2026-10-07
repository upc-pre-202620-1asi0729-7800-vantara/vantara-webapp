import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';
import { AppointmentAnimal } from '../domain/model/appointment-animal.entity';
import { Appointment } from '../domain/model/appointment.entity';
import { MedicalRecord } from '../domain/model/medical-record.entity';
import { Treatment } from '../domain/model/treatment.entity';
import { environment } from '../../../environments/environment';

export type AnimalAppointment = Appointment & { veterinarianName: string | null };

@Injectable({ providedIn: 'root' })
export class VeterinaryApiClient {
  private http = inject(HttpClient);
  private baseUrl = environment.hatariumApiBaseUrl;

  getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.baseUrl}/appointments`);
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
    return this.http.post<Appointment>(`${this.baseUrl}/appointments`, appointment);
  }

  getMedicalRecords(): Observable<MedicalRecord[]> {
    return this.http.get<MedicalRecord[]>(`${this.baseUrl}/medicalRecords`);
  }
  createMedicalRecord(record: Partial<MedicalRecord>): Observable<MedicalRecord> {
    return this.http.post<MedicalRecord>(`${this.baseUrl}/medicalRecords`, record);
  }

  getTreatments(): Observable<Treatment[]> {
    return this.http.get<Treatment[]>(`${this.baseUrl}/treatments`);
  }
  createTreatment(treatment: Partial<Treatment>): Observable<Treatment> {
    return this.http.post<Treatment>(`${this.baseUrl}/treatments`, treatment);
  }

  getVaccines(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/vaccines`);
  }
  createVaccine(vaccine: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/vaccines`, vaccine);
  }

}
