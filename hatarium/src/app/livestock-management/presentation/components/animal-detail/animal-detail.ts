import {

  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal
} from '@angular/core';

import { toSignal } from '@angular/core/rxjs-interop';
import { AnimalAppointments } from '../animal-appointments/animal-appointments';
import { ActivatedRoute, Router } from '@angular/router';
import { LivestockStore } from '../../../application/livestock-store';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {TranslatePipe} from '@ngx-translate/core';
import {FeedingPlan} from '../../../domain/model/feeding-plan.entity';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-animal-detail',
  imports: [
    CommonModule,
    MatButton,
    MatIcon,
    TranslatePipe,
    AnimalAppointments
  ],
  templateUrl: './animal-detail.html',
  styleUrl: './animal-detail.css',
  changeDetection: ChangeDetectionStrategy.Eager
})
export class AnimalDetail {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private livestockStore = inject(LivestockStore);

  animals = this.livestockStore.animals;

  private readonly routeParams = toSignal(this.route.paramMap, { initialValue: this.route.snapshot.paramMap });
  readonly animalId = computed(() => this.routeParams().get('id') ?? '');
  readonly selectedTab =
    signal<'general' | 'feeding' | 'appointments'>('general');

  animal = computed(() =>
    this.animals().find(animal => animal.id === this.animalId())
  );

  readonly feedingPlans = this.livestockStore.feedingPlans;
  readonly feedingPlanItems = this.livestockStore.feedingPlanItems;
  readonly feedingLogs = this.livestockStore.feedingLogs;

  readonly feedingPlan = computed<FeedingPlan | undefined>(() => {
    const currentAnimal = this.animal();

    if (!currentAnimal) return undefined;

    const individualPlan = this.feedingPlans().find(
      plan => plan.animalId === currentAnimal.id
    );

    if (individualPlan) {
      return individualPlan;
    }

    // Segundo: si no tiene uno individual,
    // buscar el plan correspondiente a su lote
    return this.feedingPlans().find(
      plan =>
        plan.animalId === null &&
        plan.lotId === currentAnimal.lotId
    );
  });

  readonly feedingPlanItemsForAnimal = computed(() => {
    const plan = this.feedingPlan();

    if (!plan) return [];

    return this.livestockStore.feedingPlanItems().filter(
      item => item.feedingPlanId === plan.id
    );
  });

  readonly feedingLogsForAnimal = computed(() => {
    const currentAnimal = this.animal();

    if (!currentAnimal) return [];

    return this.feedingLogs()
      .filter(log => {
        // Si el registro es específico del animal
        if (log.animalId) {
          return log.animalId === currentAnimal.id;
        }

        // Si pertenece al lote, aplica al animal
        return log.lotId === currentAnimal.lotId;
      })
      .sort(
        (a, b) =>
          new Date(b.feedAt).getTime() -
          new Date(a.feedAt).getTime()
      );
  });

  getWeightProgress(plan: FeedingPlan): number {
    if (plan.targetWeight <= 0) return 0;

    return Math.min(
      Math.round((plan.currentAverageWeight / plan.targetWeight) * 100),
      100
    );
  }

  getRemainingWeight(plan: FeedingPlan): number {
    return Math.max(
      plan.targetWeight - plan.currentAverageWeight,
      0
    );
  }

  constructor() {
    this.livestockStore.loadAnimals();
    this.livestockStore.loadLots();
    this.livestockStore.loadFeedingPlans();
    this.livestockStore.loadFeedingPlanItems();
    this.livestockStore.loadFeedingLogs();
  }

  getLotName(lotId: string): string {
    const lot = this.livestockStore.lots().find(lot => lot.id === lotId);
    return lot?.name ?? 'Sin lote';
  }

  getAge(birthDate: string): string {
    const birth = new Date(`${birthDate}T00:00:00`);
    const today = new Date();

    let age = today.getFullYear() - birth.getFullYear();

    const monthDifference = today.getMonth() - birth.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }

    if (age === 0) {
      let months = monthDifference;
      if (today.getDate() < birth.getDate()) months--;
      if (months < 0) months += 12;
      if (months === 0) {
        const days = Math.max(0, Math.floor((today.getTime() - birth.getTime()) / 86400000));
        return `${days} días`;
      }
      return `${months} meses`;
    }
    return `${age} años`;

  }

  getMotherName(motherId: string | null): string {
    if (!motherId) {
      return 'No especificada';
    }

    const mother = this.animals().find(
      animal => animal.id === motherId
    );

    return mother?.name ?? 'No especificada';
  }

  getFatherName(fatherId: string | null): string {
    if (!fatherId) {
      return 'No especificado';
    }

    const father = this.animals().find(
      animal => animal.id === fatherId
    );

    return father?.name ?? 'No especificado';
  }

  goBackToAnimals() {
    this.router.navigate(['/livestock/animals']);
  }
}
