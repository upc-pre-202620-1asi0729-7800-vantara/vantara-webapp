import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import {AnimalResource} from '../../livestock-management/infrastructure/animals-response';
import {LotResource} from '../../livestock-management/infrastructure/lots-response';
import {FeedingPlanResource} from '../../livestock-management/infrastructure/feeding-plans-response';
import {FeedingPlanItemResource} from '../../livestock-management/infrastructure/feeding-plan-items-response';
import {FeedingLogResource} from '../../livestock-management/infrastructure/feeding-logs-response';

@Service()
export class ReportsApi {

  private http = inject(HttpClient);

  private animalsUrl =
    `${environment.hatariumApiBaseUrl}${environment.hatariumAnimalsEndpointPath}`;

  private lotsUrl =
    `${environment.hatariumApiBaseUrl}${environment.hatariumLotsEndpointPath}`;

  private feedingPlansUrl =
    `${environment.hatariumApiBaseUrl}${environment.hatariumFeedingPlansEndpointPath}`;

  private feedingPlanItemsUrl =
    `${environment.hatariumApiBaseUrl}${environment.hatariumFeedingPlanItemsEndpointPath}`;

  private feedingLogsUrl =
    `${environment.hatariumApiBaseUrl}${environment.hatariumFeedingLogsEndpointPath}`;

  getAnimals(): Observable<AnimalResource[]> {
    return this.http.get<AnimalResource[]>(this.animalsUrl);
  }

  getLots(): Observable<LotResource[]> {
    return this.http.get<LotResource[]>(this.lotsUrl);
  }

  getFeedingPlans(): Observable<FeedingPlanResource[]> {
    return this.http.get<FeedingPlanResource[]>(this.feedingPlansUrl);
  }

  getFeedingPlanItems(): Observable<FeedingPlanItemResource[]> {
    return this.http.get<FeedingPlanItemResource[]>(
      this.feedingPlanItemsUrl
    );
  }

  getFeedingLogs(): Observable<FeedingLogResource[]> {
    return this.http.get<FeedingLogResource[]>(
      this.feedingLogsUrl
    );
  }

}
