import { computed, inject, Service, signal } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
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

    return forkJoin({
      animals: this.reportsApi.getAnimals(),
      lots: this.reportsApi.getLots()
    }).pipe(

      map(({ animals, lots }) => {

        const report =
          this.reportsAssembler.toLivestockReport(
            animals,
            lots,
            filter
          );


        // Dejamos solamente activo el reporte de ganado
        this.feedingReportSignal.set(null);

        this.livestockReportSignal.set(report);


        return report;

      })

    );

  }


  generateFeedingReport(
    filter: ReportFilter
  ): Observable<FeedingReport> {

    return forkJoin({

      feedingPlans:
        this.reportsApi.getFeedingPlans(),

      feedingPlanItems:
        this.reportsApi.getFeedingPlanItems(),

      feedingLogs:
        this.reportsApi.getFeedingLogs(),

      animals:
        this.reportsApi.getAnimals(),

      lots:
        this.reportsApi.getLots()

    }).pipe(

      map(({
             feedingPlans,
             feedingPlanItems,
             feedingLogs,
             animals,
             lots
           }) => {

        const report =
          this.reportsAssembler.toFeedingReport(
            feedingPlans,
            feedingPlanItems,
            feedingLogs,
            animals,
            lots,
            filter
          );


        // Dejamos solamente activo el reporte de alimentación
        this.livestockReportSignal.set(null);

        this.feedingReportSignal.set(report);


        return report;

      })

    );

  }

  clearReports(): void {

    this.livestockReportSignal.set(null);

    this.feedingReportSignal.set(null);

  }

}
