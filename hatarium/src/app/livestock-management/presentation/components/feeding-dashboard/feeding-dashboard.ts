import {
  ChangeDetectionStrategy,
  Component,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';
import {LivestockStore} from '../../../application/livestock-store';
import {FeedingPlan} from '../../../domain/model/feeding-plan.entity';
import {FeedingLog} from '../../../domain/model/feeding-log.entity';
import {FeedingPlanItem} from '../../../domain/model/feeding-plan-item.entity';
import {SessionProfile} from '../../../../shared/application/session-profile';

@Component({
  selector: 'app-feeding-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, TranslatePipe],
  templateUrl: './feeding-dashboard.html',
  styleUrl: './feeding-dashboard.css',
  changeDetection: ChangeDetectionStrategy.Eager
})
export class FeedingDashboard {

  private livestockStore = inject(LivestockStore);
  private router = inject(Router);
  private session = inject(SessionProfile);


  readonly feedingPlans = this.livestockStore.feedingPlans;
  readonly feedingPlanItems = this.livestockStore.feedingPlanItems;
  readonly feedingLogs = this.livestockStore.feedingLogs;
  readonly lots = this.livestockStore.lots;
  readonly animals = this.livestockStore.animals;
  selectedPlan = '';
  selectedItemId = '';
  feedAt = this.localDateTimeNow();
  quantity: number | null = null;
  notes = '';
  savingLog = false;
  logError = '';
  logSaved = false;

  constructor() {
    this.livestockStore.loadFeedingPlans();
    this.livestockStore.loadFeedingPlanItems();
    this.livestockStore.loadFeedingLogs();
    this.livestockStore.loadLots();
    this.livestockStore.loadAnimals();
  }

  readonly totalQuantity = (_total: number, log: { quantity: number }): number => {
    return _total + log.quantity;
  };

  getPlanDailyQuantity(planId: string): number {
    return this.feedingPlanItems()
      .filter(item => item.feedingPlanId === planId)
      .reduce((total, item) => total + item.dailyQuantity, 0);
  }

  getPlanItems(planId: string): string {
    const items = this.feedingPlanItems()
      .filter(item => item.feedingPlanId === planId);

    return items
      .map(item => `${item.feedName} ${item.dailyQuantity} ${item.unit}`)
      .join(' · ');
  }

  getAnimalsInPlan(plan: FeedingPlan): number {
    if (plan.animalId) {
      return 1;
    }

    return this.animals()
      .filter(animal => animal.lotId === plan.lotId)
      .length;
  }

  getPlanTotalDailyQuantity(plan: FeedingPlan): number {
    return this.getPlanDailyQuantity(plan.id) * this.getAnimalsInPlan(plan);
  }

  getRationTotal(planId: string): number {
    return this.feedingPlanItems()
      .filter(item => item.feedingPlanId === planId)
      .reduce((total, item) => total + item.dailyQuantity, 0);
  }

  getRationPercentage(planId: string, quantity: number): number {
    const total = this.getRationTotal(planId);

    if (total <= 0) {
      return 0;
    }

    return Math.round((quantity / total) * 100);
  }

  getProgress(plan: FeedingPlan): number {
    if (plan.targetWeight <= 0) {
      return 0;
    }

    return Math.min(
      Math.round((plan.currentAverageWeight / plan.targetWeight) * 100),
      100
    );
  }
  getLot(plan: FeedingPlan) {
    return this.lots().find(lot => lot.id === plan.lotId);
  }

  itemsForSelectedPlan(): FeedingPlanItem[] {
    return this.feedingPlanItems().filter(item => item.feedingPlanId === this.selectedPlan);
  }

  onSelectedPlanChange(): void {
    this.selectedItemId = this.itemsForSelectedPlan()[0]?.id ?? '';
  }

  saveFeedingLog(): void {
    if (this.savingLog) return;
    const plan = this.feedingPlans().find(item => item.id === this.selectedPlan);
    const item = this.itemsForSelectedPlan().find(entry => entry.id === this.selectedItemId);
    const userId = this.session.userId();
    if (!plan || !item || !userId || !this.feedAt || !this.quantity || this.quantity <= 0) {
      this.logError = 'feeding.consumptionRequired';
      this.logSaved = false;
      return;
    }
    this.savingLog = true;
    this.logError = '';
    this.logSaved = false;
    this.livestockStore.createFeedingLog({
      feedingPlanId: plan.id,
      planItemId: item.id,
      animalId: plan.animalId,
      lotId: plan.lotId,
      feedAt: this.feedAt,
      quantity: Number(this.quantity),
      recordedBy: userId,
      notes: this.notes.trim(),
    }).subscribe({
      next: () => {
        this.savingLog = false;
        this.logSaved = true;
        this.quantity = null;
        this.notes = '';
      },
      error: () => {
        this.savingLog = false;
        this.logError = 'feeding.consumptionError';
      },
    });
  }

  private localDateTimeNow(): string {
    const date = new Date();
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
  }

  getLastFeeding(plan: FeedingPlan): FeedingLog | null {
    const logs = this.feedingLogs()
      .filter(log => log.lotId === plan.lotId)
      .sort(
        (a, b) =>
          new Date(b.feedAt).getTime() -
          new Date(a.feedAt).getTime()
      );

    return logs.length > 0 ? logs[0] : null;
  }

  getTotalDailyQuantity(): number {
    return this.feedingPlans()
      .reduce(
        (total, plan) => total + this.getPlanTotalDailyQuantity(plan),
        0
      );
  }

  getCoveredAnimals(): number {
    const coveredAnimalIds = new Set<string>();

    this.feedingPlans().forEach(plan => {

      if (plan.animalId) {
        coveredAnimalIds.add(plan.animalId);
        return;
      }

      this.animals()
        .filter(animal => animal.lotId === plan.lotId)
        .forEach(animal => {
          coveredAnimalIds.add(animal.id);
        });

    });

    return coveredAnimalIds.size;
  }

  getActivityTitle(log: FeedingLog): string {
    const lot = this.lots().find(lot => lot.id === log.lotId);

    const lotName = lot?.name || log.lotId;

    return `${lotName} recibió ${log.quantity} ${log.unit} de ${log.feedName}`;
  }

  getActivityDate(log: FeedingLog): string {
    return new Date(log.feedAt).toLocaleDateString('es-PE', {
      day: '2-digit',
      month: '2-digit'
    });
  }

  getActivityTime(log: FeedingLog): string {
    return new Date(log.feedAt).toLocaleTimeString('es-PE', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  }

  goCreateFeedingPlan(): void {
    this.router.navigate(['/livestock/feeding/add']);
  }

}
