import {Animal} from '../domain/model/animal.entity';
import {computed, inject, Service, signal} from '@angular/core';
import {Lot} from '../domain/model/lot.entity';
import {Movement} from '../domain/model/movement.entity';
import {FeedingPlan} from '../domain/model/feeding-plan.entity';
import {FeedingPlanItem} from '../domain/model/feeding-plan-item.entity';
import {FeedingLog} from '../domain/model/feeding-log.entity';
import {LivestockApi} from '../infrastructure/livestock-api';
import { forkJoin, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

@Service()
export class LivestockStore {

  private animalsSignal = signal<Animal[]>([]);
  private lotsSignal = signal<Lot[]>([]);
  private movementsSignal = signal<Movement[]>([]);
  private feedingPlansSignal = signal<FeedingPlan[]>([]);
  private feedingPlanItemsSignal = signal<FeedingPlanItem[]>([]);
  private feedingLogsSignal = signal<FeedingLog[]>([]);

  private liveStockApi = inject(LivestockApi);

  readonly animals = computed(() => this.animalsSignal());
  readonly lots = computed(() => this.lotsSignal());
  readonly movements = computed(() => this.movementsSignal());
  readonly feedingPlans = computed(() => this.feedingPlansSignal());
  readonly feedingPlanItems = computed(() => this.feedingPlanItemsSignal());
  readonly feedingLogs = computed(() => this.feedingLogsSignal());

  loadAnimals() {
    if (this.animalsSignal().length === 0) {
      this.liveStockApi.getAnimals().subscribe(animals => {
        this.animalsSignal.set(animals);
      });
    }
  }

  loadLots() {
    if (this.lotsSignal().length === 0) {
      this.liveStockApi.getLots().subscribe(lots => {
        this.lotsSignal.set(lots);
      });
    }
  }

  loadMovements() {
    if (this.movementsSignal().length === 0) {
      this.liveStockApi.getMovements().subscribe(movements => {
        this.movementsSignal.set(movements);
      });
    }
  }

  loadFeedingPlans() {
    this.liveStockApi.getFeedingPlans().subscribe(feedingPlans => {
      this.feedingPlansSignal.set(feedingPlans);
    });
  }

  loadFeedingPlanItems() {
    if (this.feedingPlanItemsSignal().length === 0) {
      this.liveStockApi.getFeedingPlanItems().subscribe(feedingPlanItems => {
        this.feedingPlanItemsSignal.set(feedingPlanItems);
      });
    }
  }

  loadFeedingLogs() {
    if (this.feedingLogsSignal().length === 0) {
      this.liveStockApi.getFeedingLogs().subscribe(feedingLogs => {
        this.feedingLogsSignal.set(feedingLogs);
      });
    }
  }

  createAnimal(animal: Animal) {
    this.liveStockApi.createAnimal(animal).subscribe(createdAnimal => {
      this.animalsSignal.update(animals => [
        ...animals,
        createdAnimal
      ]);
    });
  }

  createFeedingPlan(
    plan: FeedingPlan,
    items: FeedingPlanItem[]
  ): Observable<FeedingPlan> {

    return this.liveStockApi.createFeedingPlan(plan).pipe(

      switchMap(createdPlan => {

        const itemsToCreate = items.map(item => ({
          ...item,
          feedingPlanId: createdPlan.id
        }));

        if (itemsToCreate.length === 0) {
          return of(createdPlan);
        }

        return forkJoin(
          itemsToCreate.map(item =>
            this.liveStockApi.createFeedingPlanItem(item)
          )
        ).pipe(

          tap(createdItems => {
            this.feedingPlanItemsSignal.update(items => [
              ...items,
              ...createdItems
            ]);
          }),

          map(() => createdPlan)
        );
      }),

      tap(createdPlan => {
        this.feedingPlansSignal.update(plans => [
          ...plans,
          createdPlan
        ]);
      })
    );
  }

}
