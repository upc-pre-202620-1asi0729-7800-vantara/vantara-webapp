import { inject, Service } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AnimalAssembler} from './animal-assembler';
import {MovementAssembler} from './movement-assembler';
import {FeedingLogAssembler} from './feeding-log-assembler';
import {FeedingPlanAssembler} from './feeding-plan-assembler';
import {LotAssembler} from './lot-assembler';
import {environment} from '../../../environments/environment';
import {map, Observable} from 'rxjs';
import {AnimalResource} from './animals-response';
import {Animal} from '../domain/model/animal.entity';
import {FeedingLogResource} from './feeding-logs-response';
import {FeedingLog} from '../domain/model/feeding-log.entity';
import {RecordFeedingDraft} from '../application/record-feeding-draft';
import {LotResource} from './lots-response';
import {Lot} from '../domain/model/lot.entity';
import {Movement} from '../domain/model/movement.entity';
import {MovementResource} from './movements-response';
import {FeedingPlan} from '../domain/model/feeding-plan.entity';
import {FeedingPlanResource} from './feeding-plans-response';
import {FeedingPlanItem} from '../domain/model/feeding-plan-item.entity';

@Service()
export class LivestockApi {

  private http = inject(HttpClient);

  private animalAssembler = inject(AnimalAssembler);
  private feedingPlanAssembler = inject(FeedingPlanAssembler);
  private feedingLogAssembler = inject(FeedingLogAssembler);
  private movementAssembler = inject(MovementAssembler);
  private lotAssembler = inject(LotAssembler);

  private baseUrl = environment.vantaraBackendBaseUrl;
  private animalsUrl = `${this.baseUrl}/animals`;
  private feedingPlansUrl = `${this.baseUrl}/feedingPlans`;
  private feedingLogsUrl = `${this.baseUrl}/feedingLogs`;
  private movementsUrl = `${this.baseUrl}/movements`;
  private lotsUrl = `${this.baseUrl}/lots`;

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
  createAnimal(animal: AnimalResource): Observable<Animal> {
    const payload: Omit<AnimalResource, 'id' | 'rancherId'> = {
      lotId: animal.lotId,
      earTag: animal.earTag,
      name: animal.name,
      species: animal.species,
      breed: animal.breed,
      sex: animal.sex,
      birthDate: animal.birthDate,
      motherId: animal.motherId,
      fatherId: animal.fatherId,
      weight: animal.weight,
      status: animal.status,
      registeredAt: animal.registeredAt,
      photoUrl: animal.photoUrl,
      weanedOn: animal.weanedOn,
    };
    return this.http.post<AnimalResource>(
      this.animalsUrl,
      payload
    ).pipe(
      map(resource => this.animalAssembler.toEntityFromResource(resource))
    );
  }

  deleteAnimal(id: string): Observable<void> {
    return this.http.delete<void>(`${this.animalsUrl}/${id}`);
  }

  updateAnimal(id: string, changes: Partial<AnimalResource>): Observable<Animal> {
    return this.http.patch<AnimalResource>(`${this.animalsUrl}/${id}`, changes)
      .pipe(map(resource => this.animalAssembler.toEntityFromResource(resource)));
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

  createLot(lot: Pick<Lot, 'name' | 'purpose' | 'status'>): Observable<Lot> {
    return this.http.post<LotResource>(this.lotsUrl, lot).pipe(
      map(resource => this.lotAssembler.toEntityFromResource(resource))
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

  createMovement(movement: Omit<MovementResource, 'id'>): Observable<Movement> {
    return this.http.post<MovementResource>(this.movementsUrl, movement).pipe(
      map(resource => this.movementAssembler.toEntityFromResource(resource))
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
    return this.getFeedingPlans().pipe(map(plans => plans.flatMap(plan => plan.items)));
  }

  getFeedingPlanItemsByPlan(
    feedingPlanId: string): Observable<FeedingPlanItem[]> {

    return this.http.get<FeedingPlanResource>(
      `${this.feedingPlansUrl}/${feedingPlanId}`
    ).pipe(map(resource => this.feedingPlanAssembler.toEntityFromResource(resource).items));
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

  createFeedingLog(draft: RecordFeedingDraft): Observable<FeedingLog> {
    return this.http.post<FeedingLogResource>(this.feedingLogsUrl, draft).pipe(
      map(resource => this.feedingLogAssembler.toEntityFromResource(resource))
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

  createFeedingPlan(plan: FeedingPlan, items: FeedingPlanItem[]): Observable<FeedingPlan> {
    return this.http.post<FeedingPlanResource>(
      this.feedingPlansUrl,
      {
        lotId: plan.lotId,
        animalId: plan.animalId,
        name: plan.name,
        startsOn: plan.startsOn,
        endsOn: plan.endsOn,
        objective: plan.objective,
        currentAverageWeight: plan.currentAverageWeight,
        targetWeight: plan.targetWeight,
        frequency: plan.frequency,
        daysOfWeek: plan.daysOfWeek,
        schedules: plan.schedules,
        instructions: plan.instructions,
        status: plan.status,
        items: items.map(item => ({
          feedName: item.feedName,
          dailyQuantity: item.dailyQuantity,
          unit: item.unit,
        })),
      }
    ).pipe(
      map(resource =>
        this.feedingPlanAssembler.toEntityFromResource(resource)
      )
    );
  }

}
