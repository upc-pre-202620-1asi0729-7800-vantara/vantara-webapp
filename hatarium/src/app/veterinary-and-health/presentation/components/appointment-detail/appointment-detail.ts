import { Component, OnInit, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { VeterinaryStore } from '../../../application/veterinary.store';
import { VeterinaryApiClient } from '../../../infrastructure/veterinary-api-client';
import { Appointment } from '../../../domain/model/appointment.entity';
import { MedicalRecordSeverity } from '../../../domain/model/medical-record.entity';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import {
  AnimalDTO,
  ExternalDataService,
  MedicationDTO,
  VaccineDTO
} from '../../../infrastructure/services/external-data';

@Component({
  selector: 'app-appointment-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    TranslatePipe
  ],
  templateUrl: './appointment-detail.html',
  styleUrl: './appointment-detail.css'
})
export class AppointmentDetailComponent implements OnInit {
  public store = inject(VeterinaryStore);
  private api = inject(VeterinaryApiClient);
  private externalData = inject(ExternalDataService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  public appointmentId = signal<string>('');
  public animalId = signal<string>('');
  public appointment = signal<Appointment | null>(null);
  public animal = signal<AnimalDTO | null>(null);
  public vaccines = signal<VaccineDTO[]>([]);
  public veterinarianMap = signal<Record<string, string>>({});
  public medicationMap = signal<Record<string, string>>({});
  public loading = signal<boolean>(true);
  public errorMessage = signal<string>('');

  readonly animalRecords = computed(() =>
    this.store.records().filter(record => record.animalId === this.animalId())
  );
  readonly animalTreatments = computed(() =>
    this.store.treatments().filter(treatment => treatment.animalId === this.animalId())
  );
  readonly veterinarianName = computed(() =>
    this.veterinarianMap()[this.appointment()?.veterinarianId ?? ''] ?? '—'
  );
  readonly hasDiagnosis = computed(() => this.animalRecords().length > 0);
  readonly hasTreatment = computed(() => this.animalTreatments().length > 0);
  readonly hasVaccines = computed(() => this.vaccines().length > 0);

  constructor() {
    // The store may finish loading after the route resolves; keep the view in sync.
    effect(() => {
      const id = this.appointmentId();
      if (!id) return;
      const found = this.store.appointments().find(appointment => appointment.id === id);
      if (found) this.appointment.set(found);
    });
  }

  ngOnInit(): void {
    this.store.loadAppointments();
    this.store.loadMedicalRecords();
    this.store.loadTreatments();

    this.externalData.getVeterinarians().subscribe(veterinarians => {
      const map: Record<string, string> = {};
      veterinarians.forEach(vet => { map[vet.id] = vet.fullName; });
      this.veterinarianMap.set(map);
    });

    this.externalData.getMedications().subscribe((medications: MedicationDTO[]) => {
      const map: Record<string, string> = {};
      medications.forEach(medication => { map[medication.id] = medication.name; });
      this.medicationMap.set(map);
    });

    this.route.params.subscribe(params => {
      const id = params['id'];
      if (!id) {
        this.loading.set(false);
        this.errorMessage.set('DETAIL.NOT_FOUND');
        return;
      }
      this.appointmentId.set(id);
      this.loadAppointment(id);

      this.externalData.getAppointmentAnimals().subscribe(relations => {
        const relation = relations.find(item => item.appointmentId === id);
        if (!relation) return;
        this.animalId.set(relation.animalId);
        this.externalData.getAnimalDetail(relation.animalId).subscribe(data => this.animal.set(data));
        this.externalData.getVaccinesByAnimal(relation.animalId).subscribe(list => this.vaccines.set(list));
      });
    });
  }

  public goToRegisterDiagnosis(): void {
    void this.router.navigate(['/veterinary/history/new'], {
      queryParams: {
        appointmentId: this.appointmentId(),
        animalId: this.animalId()
      }
    });
  }

  public goToPrescribeTreatment(): void {
    void this.router.navigate(['/veterinary/treatments/new'], {
      queryParams: {
        animalId: this.animalId(),
        appointmentId: this.appointmentId()
      }
    });
  }

  public severityKey(severity: MedicalRecordSeverity): string {
    if (severity === 'high') return 'DETAIL.SEVERITY_HIGH';
    if (severity === 'medium') return 'DETAIL.SEVERITY_MEDIUM';
    return 'DETAIL.SEVERITY_LOW';
  }

  public statusKey(status: string): string {
    if (status === 'completed') return 'DETAIL.STATUS_COMPLETED';
    if (status === 'cancelled') return 'DETAIL.STATUS_CANCELLED';
    return 'DETAIL.STATUS_SCHEDULED';
  }

  public originKey(origin: string): string {
    return origin === 'TECHNICAL_VISIT' ? 'DETAIL.ORIGIN_TECHNICAL' : 'DETAIL.ORIGIN_RANCHER';
  }

  public medicationName(medicationId: string): string {
    return this.medicationMap()[medicationId] ?? medicationId;
  }

  private loadAppointment(id: string): void {
    this.api.getAppointmentById(id).subscribe({
      next: appointment => {
        this.appointment.set(appointment);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.errorMessage.set('DETAIL.NOT_FOUND');
      }
    });
  }
}
