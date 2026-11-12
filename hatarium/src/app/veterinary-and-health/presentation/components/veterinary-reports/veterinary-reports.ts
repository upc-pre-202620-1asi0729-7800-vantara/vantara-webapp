import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { VeterinaryStore } from '../../../application/veterinary.store';
import {
  ExternalDataService,
  VaccineDTO
} from '../../../infrastructure/services/external-data';
import { downloadCsv } from '../../../../shared/infrastructure/csv-export';

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
  private translate = inject(TranslateService);

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

  public readonly appointmentStatusSlices = computed(() => [
    { label: 'REPORTS.STATUS_COMPLETED', value: this.completedAppointments(), color: '#219a75' },
    { label: 'REPORTS.STATUS_PENDING', value: this.pendingAppointments(), color: '#d97706' },
    { label: 'REPORTS.STATUS_CANCELLED', value: this.store.appointments().filter(appointment => appointment.status === 'cancelled').length, color: '#b91c1c' }
  ]);

  public readonly severitySlices = computed(() => [
    { label: 'DETAIL.SEVERITY_LOW', value: this.store.records().filter(record => record.severity === 'low').length, color: '#219a75' },
    { label: 'DETAIL.SEVERITY_MEDIUM', value: this.store.records().filter(record => record.severity === 'medium').length, color: '#d97706' },
    { label: 'DETAIL.SEVERITY_HIGH', value: this.store.records().filter(record => record.severity === 'high').length, color: '#b91c1c' }
  ]);

  public readonly appointmentDonutStyle = computed(() => this.buildDonut(this.appointmentStatusSlices()));
  public readonly severityDonutStyle = computed(() => this.buildDonut(this.severitySlices()));

  private buildDonut(slices: { value: number; color: string }[]): string {
    const total = slices.reduce((sum, slice) => sum + slice.value, 0) || 1;
    let acc = 0;
    const parts = slices.map(slice => {
      const start = acc;
      acc += (slice.value / total) * 360;
      return `${slice.color} ${start}deg ${acc}deg`;
    });
    return `conic-gradient(${parts.join(', ')})`;
  }

  ngOnInit(): void {
    this.store.loadAppointments();
    this.store.loadMedicalRecords();
    this.store.loadTreatments();
    this.externalData.getVaccines().subscribe(list => this.vaccines.set(list));
    this.externalData.getAnimals().subscribe(list => this.animals.set(list));
  }

  /** Opens the browser print dialog so the report can be saved as PDF. */
  exportPdf(): void {
    window.print();
  }

  /** Downloads the sanitary report as a CSV file compatible with Excel. */
  exportCsv(): void {
    const quantity = this.translate.instant('REPORTS.CSV_QUANTITY');

    const rows: (string | number)[][] = [
      [this.translate.instant('REPORTS.TITLE')],
      [this.translate.instant('REPORTS.KPI_COMPLETED_APPOINTMENTS'), this.completedAppointments()],
      [this.translate.instant('REPORTS.KPI_PENDING_APPOINTMENTS'), this.pendingAppointments()],
      [this.translate.instant('REPORTS.KPI_CRITICAL_ANIMALS'), this.criticalAnimals()],
      [this.translate.instant('REPORTS.KPI_ACTIVE_TREATMENTS'), this.activeTreatments()],
      [],
      [this.translate.instant('REPORTS.APPOINTMENT_STATUS'), quantity],
      ...this.appointmentStatusSlices().map(slice => [
        this.translate.instant(slice.label),
        slice.value,
      ]),
      [],
      [this.translate.instant('REPORTS.SEVERITY_DISTRIBUTION'), quantity],
      ...this.severitySlices().map(slice => [
        this.translate.instant(slice.label),
        slice.value,
      ]),
      [],
      [this.translate.instant('REPORTS.APPOINTMENTS_BY_MONTH'), quantity],
      ...this.appointmentBuckets().map(bucket => [bucket.label, bucket.count]),
      [],
      [this.translate.instant('REPORTS.VACCINES_BY_MONTH'), quantity],
      ...this.vaccineBuckets().map(bucket => [bucket.label, bucket.count]),
      [],
      [this.translate.instant('REPORTS.TOP_VACCINES'), this.translate.instant('REPORTS.CSV_APPLICATIONS')],
      ...this.topVaccines().map(vaccine => [vaccine.name, vaccine.count]),
    ];

    downloadCsv('reporte-sanitario.csv', rows);
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
