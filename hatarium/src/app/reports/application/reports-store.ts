import { computed, inject, Service, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ReportsApi } from '../infrastructure/reports-api';
import { ReportsAssembler } from '../infrastructure/reports-assembler';

import { ReportFilter } from '../domain/model/report-filter.entity';
import { LivestockReport } from '../domain/model/livestock-report.entity';
import { FeedingReport } from '../domain/model/feeding-report.entity';

@Service()
export class ReportsStore {

  private livestockReportSignal =
    signal<LivestockReport | null>(null);

  private feedingReportSignal =
    signal<FeedingReport | null>(null);


  private reportsApi = inject(ReportsApi);

  private reportsAssembler = inject(ReportsAssembler);


  readonly livestockReport =
    computed(() => this.livestockReportSignal());

  readonly feedingReport =
    computed(() => this.feedingReportSignal());


  generateLivestockReport(
    filter: ReportFilter
  ): Observable<LivestockReport> {

    return this.reportsApi.getLivestockReport(filter).pipe(map(resource => {
        const report = this.reportsAssembler.toLivestockReport(resource);


        // Dejamos solamente activo el reporte de ganado
        this.feedingReportSignal.set(null);

        this.livestockReportSignal.set(report);


        return report;

      }));

  }


  generateFeedingReport(
    filter: ReportFilter
  ): Observable<FeedingReport> {

    return this.reportsApi.getFeedingReport(filter).pipe(map(resource => {
        const report = this.reportsAssembler.toFeedingReport(resource);


        // Dejamos solamente activo el reporte de alimentación
        this.livestockReportSignal.set(null);

        this.feedingReportSignal.set(report);


        return report;

      }));

  }

  clearReports(): void {

    this.livestockReportSignal.set(null);

    this.feedingReportSignal.set(null);

  }

}
