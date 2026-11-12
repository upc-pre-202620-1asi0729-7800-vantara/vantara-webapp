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
import { VeterinaryStore } from '../../../../veterinary-and-health/application/veterinary.store';
import {
  ExternalDataService,
  VaccineDTO,
} from '../../../../veterinary-and-health/infrastructure/services/external-data';


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
  private veterinaryStore = inject(VeterinaryStore);
  private externalData = inject(ExternalDataService);

  animals = this.livestockStore.animals;

  private readonly routeParams = toSignal(this.route.paramMap, { initialValue: this.route.snapshot.paramMap });
  readonly animalId = computed(() => this.routeParams().get('id') ?? '');
  readonly selectedTab =
    signal<'general' | 'health' | 'feeding' | 'appointments'>('general');

  readonly photoError = signal<string | null>(null);
  readonly animalVaccines = signal<VaccineDTO[]>([]);

  animal = computed(() =>
    this.animals().find(animal => animal.id === this.animalId())
  );

  readonly animalRecords = computed(() =>
    this.veterinaryStore
      .records()
      .filter(record => record.animalId === this.animalId())
      .sort(
        (a, b) =>
          new Date(b.recordedAt).getTime() - new Date(a.recordedAt).getTime(),
      ),
  );

  readonly animalTreatments = computed(() =>
    this.veterinaryStore
      .treatments()
      .filter(treatment => treatment.animalId === this.animalId()),
  );

  readonly animalHealthStats = computed(() => ({
    totalEvents:
      this.animalRecords().length +
      this.animalTreatments().length +
      this.animalVaccines().length,
    vaccines: this.animalVaccines().length,
    treatments: this.animalTreatments().length,
    vetChecks: this.animalRecords().length,
  }));

  /** Real health status derived from the latest medical record. */
  readonly healthStatusKey = computed(() => {
    const latest = this.animalRecords()[0];
    if (!latest) return 'animal.statusNoRecords';
    if (latest.healthStatus === 'critical' || latest.severity === 'high') return 'animal.statusCritical';
    if (latest.healthStatus === 'follow_up' || latest.severity === 'medium') return 'animal.statusFollowUp';
    return 'animal.statusHealthy';
  });

  readonly healthStatusClass = computed(() => {
    const key = this.healthStatusKey();
    if (key === 'animal.statusCritical') return 'critical';
    if (key === 'animal.statusFollowUp') return 'followup';
    return 'healthy';
  });

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
    this.veterinaryStore.loadMedicalRecords();
    this.veterinaryStore.loadTreatments();
    this.externalData.getVaccines().subscribe(list => this.animalVaccines.set(list));
  }

  /** Compresses and persists a new photo for the current animal. */
  onPhotoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    const currentAnimal = this.animal();

    if (!file || !currentAnimal) return;

    if (!file.type.startsWith('image/')) {
      this.photoError.set('animal.invalidImage');
      input.value = '';
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const image = new Image();

      image.onload = () => {
        const canvas = document.createElement('canvas');
        const maxWidth = 800;
        const maxHeight = 600;

        let width = image.width;
        let height = image.height;

        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }

        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }

        canvas.width = width;
        canvas.height = height;

        const context = canvas.getContext('2d');
        if (!context) return;

        context.drawImage(image, 0, 0, width, height);
        const photoUrl = canvas.toDataURL('image/jpeg', 0.7);

        this.livestockStore.updateAnimal(currentAnimal.id, { photoUrl }).subscribe({
          next: () => this.photoError.set(null),
          error: () => this.photoError.set('animal.photoError'),
        });
      };

      image.src = reader.result as string;
    };

    reader.readAsDataURL(file);
    input.value = '';
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
