import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { ReportFilter } from '../domain/model/report-filter.entity';
import { AnimalResource } from '../../livestock-management/infrastructure/animals-response';
import { LotResource } from '../../livestock-management/infrastructure/lots-response';

export interface LivestockReportResource {
  totalAnimals: number; averageWeight: number; totalLots: number; males: number; females: number;
  animalsByLot: { lotId: string; lotName: string; animalCount: number; averageWeight: number; males: number; females: number }[];
  animalsByBreed: { breed: string; count: number }[];
}
export interface FeedingReportResource {
  totalPlans: number; animalsWithPlan: number; totalRegisteredConsumption: number; totalFeedingRecords: number;
  consumptionUnits: string[];
  totalConsumptionByUnit: { unit: string; quantity: number }[];
  consumptionByFeed: { feedName: string; quantity: number; unit: string }[];
  consumptionByLot: { lotId: string; lotName: string; planName: string; quantity: number; unit: string }[];
}

@Service()
export class ReportsApi {

  private http = inject(HttpClient);

  private baseUrl = environment.vantaraBackendBaseUrl;
  getAnimals(): Observable<AnimalResource[]> { return this.http.get<AnimalResource[]>(`${this.baseUrl}/animals`); }
  getLots(): Observable<LotResource[]> { return this.http.get<LotResource[]>(`${this.baseUrl}/lots`); }
  getLivestockReport(filter: ReportFilter): Observable<LivestockReportResource> {
    return this.http.get<LivestockReportResource>(`${this.baseUrl}/reports/livestock`, {
      params: this.reportParams(filter, ['startsOn', 'endsOn', 'lotId', 'breed', 'sex', 'status'])
    });
  }
  getFeedingReport(filter: ReportFilter): Observable<FeedingReportResource> {
    return this.http.get<FeedingReportResource>(`${this.baseUrl}/reports/feeding`, {
      params: this.reportParams(filter, ['startsOn', 'endsOn', 'lotId'])
    });
  }
  private reportParams(filter: ReportFilter, keys: (keyof ReportFilter)[]): Record<string, string> {
    const params: Record<string, string> = {};
    for (const key of keys) {
      const value = filter[key];
      if (value) params[key] = String(value);
    }
    return params;
  }

}
