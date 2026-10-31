import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { VeterinaryStore } from '../../../application/veterinary.store';
import {
  ExternalDataService,
  VaccineDTO
} from '../../../infrastructure/services/external-data';

interface MonthBucket {
  label: string;
  count: number;
}

@Component({
  selector: 'app-veterinary-reports',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, TranslatePipe],
  templateUrl: './veterinary-reports.html',
  styleUrl: './veterinary-reports.css'
})
export class VeterinaryReportsComponent implements OnInit {
  public store = inject(VeterinaryStore);
  private externalData = inject(ExternalDataService);

  public vaccines = signal<VaccineDTO[]>([]);
  public animals = signal<{ id: string; name: string }[]>([]);

  public readonly appointmentBuckets = computed<MonthBucket[]>(() => this.bucketByMonth(
    this.store.appointments().map(appointment => appointment.scheduledAt),
    6
  ));

  public readonly vaccineBuckets = computed<MonthBucket[]>(() => this.bucketByMonth(
    this.vaccines().map(vaccine => vaccine.appliedAt),
    6
  ));

  public readonly topVaccines = computed(() => {
    const counts = new Map<string, number>();
    this.vaccines().forEach(vaccine => {
      counts.set(vaccine.name, (counts.get(vaccine.name) || 0) + 1);
    });
    return [...counts.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort((first, second) => second.count - first.count)
      .slice(0, 5);
  });

  public readonly completedAppointments = computed(() =>
    this.store.appointments().filter(appointment => appointment.status === 'completed').length
  );

  public readonly pendingAppointments = computed(() =>
    this.store.appointments().filter(appointment => appointment.status === 'scheduled').length
  );

  public readonly criticalAnimals = computed(() => {
    const ids = new Set(
      this.store.records()
        .filter(record => record.severity === 'high' || record.healthStatus === 'critical')
        .map(record => record.animalId)
    );
    return ids.size;
  });

  public readonly activeTreatments = computed(() =>
    this.store.treatments().filter(treatment => treatment.status === 'active').length
  );

  public readonly maxAppointmentBucket = computed(() =>
    Math.max(1, ...this.appointmentBuckets().map(bucket => bucket.count))
  );

  public readonly maxVaccineBucket = computed(() =>
    Math.max(1, ...this.vaccineBuckets().map(bucket => bucket.count))
  );

  ngOnInit(): void {
    this.store.loadAppointments();
    this.store.loadMedicalRecords();
    this.store.loadTreatments();
    this.externalData.getVaccines().subscribe(list => this.vaccines.set(list));
    this.externalData.getAnimals().subscribe(list => this.animals.set(list));
  }

  private bucketByMonth(dates: string[], months: number): MonthBucket[] {
    const now = new Date();
    const buckets: MonthBucket[] = [];
    for (let offset = months - 1; offset >= 0; offset--) {
      const date = new Date(now.getFullYear(), now.getMonth() - offset, 1);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const label = date.toLocaleDateString('es-CO', { month: 'short', year: '2-digit' });
      const count = dates.filter(value => value && value.startsWith(key)).length;
      buckets.push({ label, count });
    }
    return buckets;
  }
}
