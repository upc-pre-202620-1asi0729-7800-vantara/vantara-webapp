import { Component, OnInit, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { VeterinaryStore } from '../../../application/veterinary.store';
import { VeterinaryApiClient } from '../../../infrastructure/veterinary-api-client';
import { Appointment } from '../../../domain/model/appointment.entity';
import {
  AnimalHealthStatus,
  MedicalRecordSeverity
} from '../../../domain/model/medical-record.entity';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AnimalDTO, ExternalDataService } from '../../../infrastructure/services/external-data';
import { SessionProfile } from '../../../../shared/application/session-profile';

@Component({
  selector: 'app-clinical-history',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, MatCardModule, MatIconModule, MatButtonModule, TranslatePipe],
  templateUrl: './clinical-history.html',
  styleUrl: './clinical-history.css'
})
export class ClinicalHistoryComponent implements OnInit {
  public store = inject(VeterinaryStore);
  private api = inject(VeterinaryApiClient);
  private externalData = inject(ExternalDataService);
  private session = inject(SessionProfile);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private translate = inject(TranslateService);

  public animal = signal<AnimalDTO | null>(null);
  public appointment = signal<Appointment | null>(null);
  public currentAnimalId = signal<string>('anm-047');
  public currentAppointmentId = signal<string>('app-001');
  public saving = signal<boolean>(false);
  public saveError = signal<string>('');

  // US028 form fields.
  public diagDate = new Date().toISOString().split('T')[0];
  public diagTime = '10:30';
  public diagnosis = '';
  public diagType = 'Clinico';
  public severity = 'Leve';
  public symptoms = '';
  public causeProbable = '';
  public notes = '';

  constructor() {
    effect(() => {
      const appointment = this.store.appointments()
        .find(item => item.id === this.currentAppointmentId());
      if (appointment) this.appointment.set(appointment);
    });
  }

  ngOnInit(): void {
    this.store.loadAppointments();
    this.store.loadMedicalRecords();

    this.route.queryParams.subscribe(params => {
      const animalId = params['animalId'] || 'anm-047';
      const appointmentId = params['appointmentId'] || 'app-001';

      this.currentAnimalId.set(animalId);
      this.currentAppointmentId.set(appointmentId);

      this.externalData.getAnimalDetail(animalId).subscribe(data => this.animal.set(data));
      this.api.getAppointmentById(appointmentId).subscribe({
        next: appointment => this.appointment.set(appointment),
        error: () => this.appointment.set(null)
      });
    });
  }

  public saveDiagnosis(): void {
    if (this.saving()) return;

    if (!this.diagnosis.trim() || !this.symptoms.trim()) {
      this.saveError.set('CLINICAL.ALERT_FILL');
      return;
    }

    const severity: MedicalRecordSeverity =
      this.severity === 'Grave' ? 'high' : this.severity === 'Moderada' ? 'medium' : 'low';
    const healthStatus: AnimalHealthStatus =
      severity === 'high' ? 'critical' : severity === 'medium' ? 'follow_up' : 'healthy';

    const notes = [
      this.notes.trim(),
      this.causeProbable.trim() ? `${this.translate.instant('CLINICAL.CAUSE_LABEL')}: ${this.causeProbable.trim()}` : '',
      `Tipo: ${this.diagType}`
    ].filter(Boolean).join(' · ');

    this.saving.set(true);
    this.saveError.set('');

    this.store.createMedicalRecord({
      appointmentId: this.currentAppointmentId(),
      animalId: this.currentAnimalId(),
      veterinarianId: this.session.user()?.id ?? 'usr-003',
      recordedAt: `${this.diagDate}T${this.diagTime}:00`,
      symptoms: this.symptoms,
      diagnosis: this.diagnosis,
      severity,
      healthStatus,
      notes
    }).subscribe({
      next: record => {
        if (this.currentAppointmentId()) {
          this.store.updateAppointment(this.currentAppointmentId(), { status: 'completed' }).subscribe({
            error: () => { /* best effort; the UI already moved on */ }
          });
        }
        this.saving.set(false);
        void this.router.navigate(['/veterinary/treatments/new'], {
          queryParams: {
            animalId: this.currentAnimalId(),
            appointmentId: this.currentAppointmentId(),
            recordId: record.id
          }
        });
      },
      error: () => {
        this.saving.set(false);
        this.saveError.set('CLINICAL.ALERT_ERROR');
      }
    });
  }
}
