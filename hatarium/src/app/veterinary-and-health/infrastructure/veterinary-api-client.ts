import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from '../domain/model/appointment.entity';
import { MedicalRecord } from '../domain/model/medical-record.entity';
import { Treatment } from '../domain/model/treatment.entity';

@Injectable({ providedIn: 'root' })
export class VeterinaryApiClient {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000';

  getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.baseUrl}/appointments`);
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
}
