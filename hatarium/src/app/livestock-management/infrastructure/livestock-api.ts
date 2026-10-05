import { inject, Service } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { Animal } from '../domain/model/animal.entity';
import { AnimalsResponse } from './animals-response';
import { AnimalAssembler } from './animal-assembler';

import { Lot } from '../domain/model/lot.entity';
import { LotsResponse } from './lots-response';
import { LotAssembler } from './lot-assembler';

import { Movement } from '../domain/model/movement.entity';
import { MovementsResponse } from './movements-response';
import { MovementAssembler } from './movement-assembler';

import { FeedingPlan } from '../domain/model/feeding-plan.entity';
import { FeedingPlansResponse } from './feeding-plans-response';
import { FeedingPlanAssembler } from './feeding-plan-assembler';

import { FeedingPlanItem } from '../domain/model/feeding-plan-item.entity';
import { FeedingPlanItemsResponse } from './feeding-plan-items-response';
import { FeedingPlanItemAssembler } from './feeding-plan-item-assembler';

import { FeedingLog } from '../domain/model/feeding-log.entity';
import { FeedingLogsResponse } from './feeding-logs-response';
import { FeedingLogAssembler } from './feeding-log-assembler';

@Service()
/**
 * Infrastructure gateway to the livestock API.
 *
 * @remarks
 * The gateway returns domain entities by delegating resource mapping
 * to assembler classes.
 */
export class LivestockApi {

  private baseUrl = environment.hatariumApiBaseUrl;

  private animalsEndpoint = environment.hatariumAnimalsEndpointPath;
  private lotsEndpoint = environment.hatariumLotsEndpointPath;
  private movementsEndpoint = environment.hatariumMovementsEndpointPath;
  private feedingPlansEndpoint = environment.hatariumFeedingPlansEndpointPath;
  private feedingPlanItemsEndpoint = environment.hatariumFeedingPlanItemsEndpointPath;
  private feedingLogsEndpoint = environment.hatariumFeedingLogsEndpointPath;

  private http = inject(HttpClient);

  private animalAssembler = inject(AnimalAssembler);
  private lotAssembler = inject(LotAssembler);
  private movementAssembler = inject(MovementAssembler);
  private feedingPlanAssembler = inject(FeedingPlanAssembler);
  private feedingPlanItemAssembler = inject(FeedingPlanItemAssembler);
  private feedingLogAssembler = inject(FeedingLogAssembler);

  getAnimals(): Observable<Animal[]> {
    return this.http.get<AnimalsResponse>(
      `${this.baseUrl}${this.animalsEndpoint}`
    ).pipe(
      map(response => this.animalAssembler.toEntitiesFromResponse(response))
    );
  }

  getLots(): Observable<Lot[]> {
    return this.http.get<LotsResponse>(
      `${this.baseUrl}${this.lotsEndpoint}`
    ).pipe(
      map(response => this.lotAssembler.toEntitiesFromResponse(response))
    );
  }

  getMovements(): Observable<Movement[]> {
    return this.http.get<MovementsResponse>(
      `${this.baseUrl}${this.movementsEndpoint}`
    ).pipe(
      map(response => this.movementAssembler.toEntitiesFromResponse(response))
    );
  }

  getFeedingPlans(): Observable<FeedingPlan[]> {
    return this.http.get<FeedingPlansResponse>(
      `${this.baseUrl}${this.feedingPlansEndpoint}`
    ).pipe(
      map(response => this.feedingPlanAssembler.toEntitiesFromResponse(response))
    );
  }

  getFeedingPlanItems(): Observable<FeedingPlanItem[]> {
    return this.http.get<FeedingPlanItemsResponse>(
      `${this.baseUrl}${this.feedingPlanItemsEndpoint}`
    ).pipe(
      map(response => this.feedingPlanItemAssembler.toEntitiesFromResponse(response))
    );
  }

  getFeedingLogs(): Observable<FeedingLog[]> {
    return this.http.get<FeedingLogsResponse>(
      `${this.baseUrl}${this.feedingLogsEndpoint}`
    ).pipe(
      map(response => this.feedingLogAssembler.toEntitiesFromResponse(response))
    );
  }
}
