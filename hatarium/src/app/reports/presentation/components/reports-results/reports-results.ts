import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { ReportsStore } from '../../../application/reports-store';
import { downloadCsv } from '../../../../shared/infrastructure/csv-export';

@Component({
  selector: 'app-reports-results',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule
  ],
  templateUrl: './reports-results.html',
  styleUrl: './reports-results.css'
})
export class ReportsResults {

  readonly reportsStore = inject(ReportsStore);

  get isLivestockReport(): boolean {
    return this.reportsStore.livestockReport() !== null;
  }

  get isFeedingReport(): boolean {
    return this.reportsStore.feedingReport() !== null;
  }

  goBack(): void {
    window.history.back();
  }

  /** Opens the browser print dialog; the user can save the page as PDF. */
  exportPdf(): void {
    window.print();
  }

  /** Downloads the current report as a CSV file that Excel can open. */
  exportExcel(): void {
    if (this.isLivestockReport) {
      this.exportLivestockReport();
      return;
    }

    if (this.isFeedingReport) {
      this.exportFeedingReport();
    }
  }

  private exportLivestockReport(): void {
    const report = this.reportsStore.livestockReport();
    if (!report) return;

    const rows: (string | number)[][] = [
      ['Reporte de ganado'],
      ['Total de animales', report.totalAnimals],
      ['Peso promedio (kg)', report.averageWeight],
      ['Total de lotes', report.totalLots],
      ['Machos', report.males],
      ['Hembras', report.females],
      [],
      ['Lote', 'Animales', 'Peso promedio (kg)', 'Machos', 'Hembras'],
      ...report.animalsByLot.map(lot => [
        lot.lotName,
        lot.animalCount,
        lot.averageWeight,
        lot.males,
        lot.females,
      ]),
      [],
      ['Raza', 'Cantidad'],
      ...report.animalsByBreed.map(breed => [breed.breed, breed.count]),
    ];

    downloadCsv('reporte-ganado.csv', rows);
  }

  private exportFeedingReport(): void {
    const report = this.reportsStore.feedingReport();
    if (!report) return;

    const rows: (string | number)[][] = [
      ['Reporte de alimentación'],
      ['Planes de alimentación', report.totalPlans],
      ['Animales con plan', report.animalsWithPlan],
      ['Consumo registrado', report.totalRegisteredConsumption],
      ['Registros de alimentación', report.totalFeedingRecords],
      [],
      ['Lote', 'Plan', 'Consumo', 'Unidad'],
      ...report.consumptionByLot.map(lot => [
        lot.lotName,
        lot.planName,
        lot.quantity,
        lot.unit,
      ]),
      [],
      ['Alimento', 'Consumo', 'Unidad'],
      ...report.consumptionByFeed.map(feed => [
        feed.feedName,
        feed.quantity,
        feed.unit,
      ]),
    ];

    downloadCsv('reporte-alimentacion.csv', rows);
  }

}
