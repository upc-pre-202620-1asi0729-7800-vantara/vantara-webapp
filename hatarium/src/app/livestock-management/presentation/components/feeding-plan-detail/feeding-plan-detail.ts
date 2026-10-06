import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {LivestockStore} from '../../../application/livestock-store';
import {FeedingPlan} from '../../../domain/model/feeding-plan.entity';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-feeding-plan-detail',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './feeding-plan-detail.html',
  styleUrl: './feeding-plan-detail.css',
  changeDetection: ChangeDetectionStrategy.Eager
})
export class FeedingPlanDetail {

  private livestockStore = inject(LivestockStore);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  readonly feedingPlans = this.livestockStore.feedingPlans;
  readonly feedingPlanItems = this.livestockStore.feedingPlanItems;
  readonly lots = this.livestockStore.lots;
  readonly animals = this.livestockStore.animals;

  readonly planId = this.route.snapshot.paramMap.get('id') ?? '';

  readonly plan = computed<FeedingPlan | undefined>(() =>
    this.feedingPlans().find(plan => plan.id === this.planId)
  );

  readonly planItems = computed(() =>
    this.feedingPlanItems()
      .filter(item => item.feedingPlanId === this.planId)
  );

  readonly lot = computed(() => {
    const currentPlan = this.plan();

    if (!currentPlan) {
      return undefined;
    }

    return this.lots().find(lot => lot.id === currentPlan.lotId);
  });

  constructor() {
    this.livestockStore.loadFeedingPlans();
    this.livestockStore.loadFeedingPlanItems();
    this.livestockStore.loadLots();
    this.livestockStore.loadAnimals();
  }

  getProgress(plan: FeedingPlan): number {
    if (plan.targetWeight <= 0) {
      return 0;
    }

    return Math.min(
      Math.round(
        (plan.currentAverageWeight / plan.targetWeight) * 100
      ),
      100
    );
  }

  getRemainingWeight(plan: FeedingPlan): number {
    return Math.max(
      plan.targetWeight - plan.currentAverageWeight,
      0
    );
  }

  goBack(): void {
    this.router.navigate(['/livestock/feeding']);
  }

  getAnimal(plan: FeedingPlan) {
    if (!plan.animalId) {
      return undefined;
    }

    return this.animals().find(
      animal => animal.id === plan.animalId
    );
  }
}
