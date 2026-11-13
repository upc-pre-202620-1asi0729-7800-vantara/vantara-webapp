import { Component, OnInit, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { VeterinaryStore } from '../../../application/veterinary.store';
import { VeterinaryApiClient } from '../../../infrastructure/veterinary-api-client';
import { Appointment } from '../../../domain/model/appointment.entity';
import { MedicalRecord } from '../../../domain/model/medical-record.entity';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  AnimalDTO,
  ExternalDataService,
  MedicationDTO
} from '../../../infrastructure/services/external-data';
import { SessionProfile } from '../../../../shared/application/session-profile';

@Component({
  selector: 'app-treatment-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, MatCardModule, MatIconModule, MatButtonModule, TranslatePipe],
  templateUrl: './treatment-list.html',
  styleUrl: './treatment-list.css'
})
export class TreatmentListComponent implements OnInit {
  public store = inject(VeterinaryStore);
  private api = inject(VeterinaryApiClient);
  private externalData = inject(ExternalDataService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  public session = inject(SessionProfile);

  public animal = signal<AnimalDTO | null>(null);
  public appointment = signal<Appointment | null>(null);
  public diagnosisRecord = signal<MedicalRecord | null>(null);
  public medicationsList = signal<MedicationDTO[]>([]);
  public currentAnimalId = signal<string>('anm-047');
  public currentRecordId = signal<string>('');
  public currentAppointmentId = signal<string>('');
  public saving = signal<boolean>(false);
  public saveError = signal<string>('');

  // US029 form fields.
  public treatmentType = 'Preventivo';
  public purpose = 'Tratamiento rutinario';
  public selectedMedicationId = '';
  public dose = 5;
  public doseUnit = 'mL';
  public routeAdmin = 'Intramuscular';
  public frequencyHours = 24;
  public durationDays = 7;
  public instructions = 'Completar esquema indicado cada 24 horas.';
  public needsVaccine = false;
  public notes = 'Monitorear la respuesta del animal.';

  constructor() {
    effect(() => {
      const appointmentId = this.currentAppointmentId();
      if (!appointmentId) return;
      const found = this.store.appointments().find(item => item.id === appointmentId);
      if (found) this.appointment.set(found);
    });
  }

  ngOnInit(): void {
    this.store.loadMedicalRecords();
    this.store.loadTreatments();
    this.store.loadAppointments();

    this.route.queryParams.subscribe(params => {
      const animalId = params['animalId'] || 'anm-047';
      const recordId = params['recordId'] || '';
      const appointmentId = params['appointmentId'] || '';

      this.currentAnimalId.set(animalId);
      this.currentRecordId.set(recordId);
      this.currentAppointmentId.set(appointmentId);

      this.externalData.getAnimalDetail(animalId).subscribe(data => this.animal.set(data));

      if (appointmentId) {
        this.api.getAppointmentById(appointmentId).subscribe({
          next: appointment => this.appointment.set(appointment),
          error: () => this.appointment.set(null)
        });
      }

      this.resolveDiagnosis(animalId, recordId);
    });

    this.externalData.getMedications().subscribe(medications => {
      this.medicationsList.set(medications);
      if (!this.selectedMedicationId && medications.length > 0) {
        this.selectedMedicationId = medications[0].id;
      }
    });
  }

  public saveTreatment(): void {
    if (this.saving()) return;

    if (!this.selectedMedicationId || !(this.dose > 0) || !this.currentRecordId()) {
      this.saveError.set('TREATMENT.ALERT_FILL');
      return;
    }

    const scheduledAt = new Date();
    const nextDate = new Date(scheduledAt);
    nextDate.setDate(nextDate.getDate() + Number(this.durationDays));

    const instructions = [this.instructions.trim(), this.notes.trim()].filter(Boolean).join(' · ');

    this.saving.set(true);
    this.saveError.set('');

    this.store.createTreatment({
      medicalRecordId: this.currentRecordId(),
      animalId: this.currentAnimalId(),
      medicationId: this.selectedMedicationId,
      treatmentType: this.treatmentType,
      dose: Number(this.dose),
      doseUnit: this.doseUnit,
      route: this.routeAdmin,
      frequencyHours: Number(this.frequencyHours),
      durationDays: Number(this.durationDays),
      scheduledAt: scheduledAt.toISOString(),
      administeredAt: scheduledAt.toISOString(),
      nextDate: nextDate.toISOString().split('T')[0],
      status: 'active',
      instructions
    }).subscribe({
      next: () => {
        this.saving.set(false);
        if (this.needsVaccine) {
          void this.router.navigate(['/veterinary/vaccines/new'], {
            queryParams: { animalId: this.currentAnimalId() }
          });
        } else {
          void this.router.navigate(['/veterinary/appointments']);
        }
      },
      error: () => {
        this.saving.set(false);
        this.saveError.set('TREATMENT.ALERT_ERROR');
      }
    });
  }

  private resolveDiagnosis(animalId: string, recordId: string): void {
    if (recordId) {
      const record = this.store.records().find(item => item.id === recordId);
      if (record) this.diagnosisRecord.set(record);
    }

    this.api.getMedicalRecordsByAnimal(animalId).subscribe(records => {
      if (recordId) {
        const record = records.find(item => item.id === recordId);
        if (record) {
          this.diagnosisRecord.set(record);
          return;
        }
      }

      const latest = [...records].sort((first, second) =>
        new Date(second.recordedAt).getTime() - new Date(first.recordedAt).getTime()
      )[0];

      if (latest) {
        this.diagnosisRecord.set(latest);
        if (!this.currentRecordId()) this.currentRecordId.set(latest.id);
      }
    });
  }
}
