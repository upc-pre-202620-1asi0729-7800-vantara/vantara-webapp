import {Animal} from '../domain/model/animal.entity';
import {computed, inject, Service, signal} from '@angular/core';
import {Lot} from '../domain/model/lot.entity';
import {Movement} from '../domain/model/movement.entity';
import {FeedingPlan} from '../domain/model/feeding-plan.entity';
import {FeedingPlanItem} from '../domain/model/feeding-plan-item.entity';
import {FeedingLog} from '../domain/model/feeding-log.entity';
import {LivestockApi} from '../infrastructure/livestock-api';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { ActivityNotifications } from '../../notifications/application/activity-notifications';
import { RecordFeedingDraft } from './record-feeding-draft';

@Service()
export class LivestockStore {

  private animalsSignal = signal<Animal[]>([]);
  private lotsSignal = signal<Lot[]>([]);
  private movementsSignal = signal<Movement[]>([]);
  private feedingPlansSignal = signal<FeedingPlan[]>([]);
  private feedingLogsSignal = signal<FeedingLog[]>([]);
  private feedingPlansLoading = false;

  private liveStockApi = inject(LivestockApi);
  private readonly notifications = inject(ActivityNotifications);

  readonly animals = computed(() => this.animalsSignal());
  readonly lots = computed(() => this.lotsSignal());
  readonly movements = computed(() => this.movementsSignal());
  readonly feedingPlans = computed(() => this.feedingPlansSignal());
  /** Projected from the nested plan resources; the backend has no item collection endpoint. */
  readonly feedingPlanItems = computed(() => this.feedingPlansSignal().flatMap(plan => plan.items));
  readonly feedingLogs = computed(() => this.feedingLogsSignal());

  loadAnimals(force = false) {
    if (force || this.animalsSignal().length === 0) {
      this.liveStockApi.getAnimals().subscribe(animals => {
        this.animalsSignal.set(animals);
      });
    }
  }

  rememberAnimal(animal: Animal): void {
    this.animalsSignal.update(animals => [
      ...animals.filter(existing => existing.id !== animal.id), animal,
    ]);
  }

  /** Persists a partial animal update (e.g. the photo) and refreshes the list. */
  updateAnimal(id: string, changes: Partial<Animal>) {
    return this.liveStockApi.updateAnimal(id, changes as never).pipe(
      tap(updated => this.rememberAnimal(updated)),
    );
  }

  loadLots() {
    if (this.lotsSignal().length === 0) {
      this.liveStockApi.getLots().subscribe(lots => {
        this.lotsSignal.set(lots);
      });
    }
  }

  createLot(lot: Pick<Lot, 'name' | 'purpose' | 'status'>): Observable<Lot> {
    return this.liveStockApi.createLot(lot).pipe(
      tap(created => this.lotsSignal.update(lots => [...lots, created]))
    );
  }

  loadMovements() {
    if (this.movementsSignal().length === 0) {
      this.liveStockApi.getMovements().subscribe(movements => {
        this.movementsSignal.set(movements);
      });
    }
  }

  createMovement(movement: Omit<import('../infrastructure/movements-response').MovementResource, 'id'>): Observable<Movement> {
    return this.liveStockApi.createMovement(movement).pipe(
      tap(created => {
        this.movementsSignal.update(movements => [created, ...movements]);
        this.loadAnimals(true);
      })
    );
  }

  loadFeedingPlans(force = false) {
    if (this.feedingPlansLoading || (!force && this.feedingPlansSignal().length > 0)) return;
    this.feedingPlansLoading = true;
    this.liveStockApi.getFeedingPlans().subscribe({
      next: feedingPlans => this.feedingPlansSignal.set(feedingPlans),
      error: () => { this.feedingPlansLoading = false; },
      complete: () => { this.feedingPlansLoading = false; },
    });
  }

  loadFeedingPlanItems() {
    this.loadFeedingPlans();
  }

  loadFeedingLogs() {
    if (this.feedingLogsSignal().length === 0) {
      this.liveStockApi.getFeedingLogs().subscribe(feedingLogs => {
        this.feedingLogsSignal.set(feedingLogs);
      });
    }
  }

  createFeedingLog(draft: RecordFeedingDraft): Observable<FeedingLog> {
    return this.liveStockApi.createFeedingLog(draft).pipe(
      tap(log => this.feedingLogsSignal.update(logs => [log, ...logs]))
    );
  }

  createAnimal(animal: Animal): Observable<Animal> {
    return this.liveStockApi.createAnimal(animal).pipe(
      tap(createdAnimal => this.rememberAnimal(createdAnimal)),
      switchMap(createdAnimal => this.notifications.publish({
        recipientUserId: createdAnimal.rancherId, type: 'ANIMAL_REGISTERED',
        title: 'Nuevo animal registrado',
        description: `${createdAnimal.name} (#${createdAnimal.earTag}) se agregó al ganado${createdAnimal.isCalf() ? ' como cría / bebé' : ''}.`,
        relatedEntityType: 'Animal', relatedEntityId: createdAnimal.id,
      }).pipe(map(() => createdAnimal))),
    );
  }

  createFeedingPlan(
    plan: FeedingPlan,
    items: FeedingPlanItem[]
  ): Observable<FeedingPlan> {

    return this.liveStockApi.createFeedingPlan(plan, items).pipe(

      tap(createdPlan => {
        this.feedingPlansSignal.update(plans => [
          ...plans,
          createdPlan
        ]);
      }),
      switchMap(createdPlan => this.notifications.publish({
        recipientUserId: this.animals().find(animal => animal.id === createdPlan.animalId)?.rancherId
          ?? this.lots().find(lot => lot.id === createdPlan.lotId)?.rancherId,
        type: 'FEEDING_REGISTERED', title: 'Plan de alimentación registrado',
        description: `Se registró el plan ${createdPlan.name}, desde ${createdPlan.startsOn} hasta ${createdPlan.endsOn}.`,
        relatedEntityType: 'FeedingPlan', relatedEntityId: createdPlan.id,
      }).pipe(map(() => createdPlan))),
    );
  }

}
