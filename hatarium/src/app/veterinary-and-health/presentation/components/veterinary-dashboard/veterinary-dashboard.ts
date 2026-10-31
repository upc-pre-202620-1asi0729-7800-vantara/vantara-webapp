import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { VeterinaryStore } from '../../../application/veterinary.store';
import {
  AnimalDTO,
  ExternalDataService,
  VaccineDTO
} from '../../../infrastructure/services/external-data';
import { SessionProfile } from '../../../../shared/application/session-profile';

@Component({
  selector: 'app-veterinary-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, TranslatePipe],
  templateUrl: './veterinary-dashboard.html',
  styleUrl: './veterinary-dashboard.css'
})
export class VeterinaryDashboardComponent implements OnInit {
  public store = inject(VeterinaryStore);
  private externalData = inject(ExternalDataService);
  private session = inject(SessionProfile);
  private router = inject(Router);

  public vaccines = signal<VaccineDTO[]>([]);
  public animals = signal<AnimalDTO[]>([]);
  public loading = signal<boolean>(true);

  public readonly vetName = this.session.fullName;

  public readonly greetingKey = computed(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'DASHBOARD.GREETING_MORNING';
    if (hour < 18) return 'DASHBOARD.GREETING_AFTERNOON';
    return 'DASHBOARD.GREETING_EVENING';
  });

  public readonly appointmentsToday = computed(() => {
    const today = new Date().toISOString().split('T')[0];
    return this.store.appointments()
      .filter(appointment => appointment.scheduledAt.startsWith(today))
      .sort((first, second) =>
        new Date(first.scheduledAt).getTime() - new Date(second.scheduledAt).getTime()
      );
  });

  public readonly pendingVaccinesThisMonth = computed(() => {
    const now = new Date();
    return this.vaccines().filter(vaccine => {
      if (!vaccine.nextDoseAt) return false;
      const date = new Date(vaccine.nextDoseAt);
      return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth();
    }).length;
  });

  public readonly criticalAnimals = computed(() => {
    const ids = new Set(
      this.store.records()
        .filter(record => record.severity === 'high' || record.healthStatus === 'critical')
        .map(record => record.animalId)
    );
    return ids.size;
  });

  public readonly activeAlerts = computed(() =>
    this.store.records().filter(record => record.severity !== 'low').length
  );

  public readonly upcomingAppointments = computed(() => this.appointmentsToday().slice(0, 5));

  public readonly recentVaccines = computed(() =>
    [...this.vaccines()]
      .sort((first, second) => new Date(second.appliedAt).getTime() - new Date(first.appliedAt).getTime())
      .slice(0, 4)
  );

  public readonly activeTreatments = computed(() =>
    this.store.treatments().filter(treatment => treatment.status === 'active')
  );

  public animalName(animalId: string): string {
    const animal = this.animals().find(item => item.id === animalId);
    return animal ? `#${animal.earTag} · ${animal.name}` : animalId;
  }

  ngOnInit(): void {
    this.store.loadAppointments();
    this.store.loadMedicalRecords();
    this.store.loadTreatments();

    this.externalData.getVaccines().subscribe(list => this.vaccines.set(list));
    this.externalData.getAnimals().subscribe(list => this.animals.set(list));

    setTimeout(() => this.loading.set(false), 600);
  }

  public goToAppointments(): void {
    void this.router.navigate(['/veterinary/appointments']);
  }

  public goToDetail(appointmentId: string): void {
    void this.router.navigate([`/veterinary/appointments/${appointmentId}`]);
  }
}
