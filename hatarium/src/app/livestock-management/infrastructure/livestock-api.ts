import { inject, Service } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AnimalAssembler} from './animal-assembler';
import {MovementAssembler} from './movement-assembler';
import {FeedingLogAssembler} from './feeding-log-assembler';
import {FeedingPlanItemAssembler} from './feeding-plan-item-assembler';
import {FeedingPlanAssembler} from './feeding-plan-assembler';
import {LotAssembler} from './lot-assembler';
import {environment} from '../../../environments/environment';
import {map, Observable} from 'rxjs';
import {AnimalResource} from './animals-response';
import {Animal} from '../domain/model/animal.entity';
import {FeedingLogResource} from './feeding-logs-response';
import {FeedingLog} from '../domain/model/feeding-log.entity';
import {LotResource} from './lots-response';
import {Lot} from '../domain/model/lot.entity';
import {Movement} from '../domain/model/movement.entity';
import {MovementResource} from './movements-response';
import {FeedingPlan} from '../domain/model/feeding-plan.entity';
import {FeedingPlanResource} from './feeding-plans-response';
import {FeedingPlanItem} from '../domain/model/feeding-plan-item.entity';
import {FeedingPlanItemResource} from './feeding-plan-items-response';

@Service()
export class LivestockApi {

  private http = inject(HttpClient);

  private animalAssembler = inject(AnimalAssembler);
  private feedingPlanItemAssembler = inject(FeedingPlanItemAssembler);
  private feedingPlanAssembler = inject(FeedingPlanAssembler);
  private feedingLogAssembler = inject(FeedingLogAssembler);
  private movementAssembler = inject(MovementAssembler);
  private lotAssembler = inject(LotAssembler);

  private animalsUrl = `${environment.hatariumApiBaseUrl}${environment.hatariumAnimalsEndpointPath}`;
  private feedingPlanItemsUrl = `${environment.hatariumApiBaseUrl}${environment.hatariumFeedingPlanItemsEndpointPath}`;
  private feedingPlansUrl = `${environment.hatariumApiBaseUrl}${environment.hatariumFeedingPlansEndpointPath}`;
  private feedingLogsUrl = `${environment.hatariumApiBaseUrl}${environment.hatariumFeedingLogsEndpointPath}`;
  private movementsUrl = `${environment.hatariumApiBaseUrl}${environment.hatariumMovementsEndpointPath}`;
  private lotsUrl = `${environment.hatariumApiBaseUrl}${environment.hatariumLotsEndpointPath}`;

  getAnimals(): Observable<Animal[]> {
    return this.http.get<AnimalResource[]>(this.animalsUrl).pipe(
      map(resources =>
        resources.map(resource =>
          this.animalAssembler.toEntityFromResource(resource)
        )
      )
    );
  }

  getAnimalById(id: string): Observable<Animal> {
    return this.http.get<AnimalResource>(
      `${this.animalsUrl}/${id}`
    ).pipe(
      map(resource =>
        this.animalAssembler.toEntityFromResource(resource)
      )
    );
  }

  getLots(): Observable<Lot[]> {
    return this.http.get<LotResource[]>(this.lotsUrl).pipe(
      map(resources =>
        resources.map(resource =>
          this.lotAssembler.toEntityFromResource(resource)
        )
      )
    );
  }

  getLotById(id: string): Observable<Lot> {
    return this.http.get<LotResource>(
      `${this.lotsUrl}/${id}`
    ).pipe(
      map(resource =>
        this.lotAssembler.toEntityFromResource(resource)
      )
    );
  }

  getMovements(): Observable<Movement[]> {
    return this.http.get<MovementResource[]>(this.movementsUrl).pipe(
      map(resources =>
        resources.map(resource =>
          this.movementAssembler.toEntityFromResource(resource)
        )
      )
    );
  }

  getMovementsByAnimal(animalId: string): Observable<Movement[]> {
    return this.http.get<MovementResource[]>(
      `${this.movementsUrl}?animalId=${animalId}`
    ).pipe(
      map(resources =>
        resources.map(resource =>
          this.movementAssembler.toEntityFromResource(resource)
        )
      )
    );
  }

  getFeedingPlans(): Observable<FeedingPlan[]> {
    return this.http.get<FeedingPlanResource[]>(this.feedingPlansUrl).pipe(
      map(resources =>
        resources.map(resource =>
          this.feedingPlanAssembler.toEntityFromResource(resource)
        )
      )
    );
  }

  getFeedingPlanById(id: string): Observable<FeedingPlan> {
    return this.http.get<FeedingPlanResource>(
      `${this.feedingPlansUrl}/${id}`
    ).pipe(
      map(resource =>
        this.feedingPlanAssembler.toEntityFromResource(resource)
      )
    );
  }

  getFeedingPlanItems(): Observable<FeedingPlanItem[]> {
    return this.http.get<FeedingPlanItemResource[]>(
      this.feedingPlanItemsUrl
    ).pipe(
      map(resources =>
        resources.map(resource =>
          this.feedingPlanItemAssembler.toEntityFromResource(resource)
        )
      )
    );
  }

  getFeedingPlanItemsByPlan(
    feedingPlanId: string): Observable<FeedingPlanItem[]> {

    return this.http.get<FeedingPlanItemResource[]>(
      `${this.feedingPlanItemsUrl}?feedingPlanId=${feedingPlanId}`
    ).pipe(
      map(resources =>
        resources.map(resource =>
          this.feedingPlanItemAssembler.toEntityFromResource(resource)
        )
      )
    );
  }

  getFeedingLogs(): Observable<FeedingLog[]> {
    return this.http.get<FeedingLogResource[]>(
      this.feedingLogsUrl
    ).pipe(
      map(resources =>
        resources.map(resource =>
          this.feedingLogAssembler.toEntityFromResource(resource)
        )
      )
    );
  }

  getFeedingLogsByLot(lotId: string): Observable<FeedingLog[]> {

    return this.http.get<FeedingLogResource[]>(
      `${this.feedingLogsUrl}?lotId=${lotId}`
    ).pipe(
      map(resources =>
        resources.map(resource =>
          this.feedingLogAssembler.toEntityFromResource(resource)
        )
      )
    );
  }

  getFeedingLogsByAnimal(animalId: string): Observable<FeedingLog[]> {

    return this.http.get<FeedingLogResource[]>(
      `${this.feedingLogsUrl}?animalId=${animalId}`
    ).pipe(
      map(resources =>
        resources.map(resource =>
          this.feedingLogAssembler.toEntityFromResource(resource)
        )
      )
    );
  }
}
