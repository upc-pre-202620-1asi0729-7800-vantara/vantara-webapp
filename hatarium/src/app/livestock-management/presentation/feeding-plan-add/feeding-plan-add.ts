import {
  ChangeDetectionStrategy,
  Component,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import {LivestockStore} from '../../application/livestock-store';


@Component({
  selector: 'app-feeding-plan-add',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule
  ],
  templateUrl: './feeding-plan-add.html',
  styleUrl: './feeding-plan-add.css',
  changeDetection: ChangeDetectionStrategy.Eager
})
export class FeedingPlanCreate {

  private livestockStore = inject(LivestockStore);
  private router = inject(Router);

  currentStep = 1;

  readonly lots = this.livestockStore.lots;
  readonly animals = this.livestockStore.animals;

  // Datos del Paso 1
  planName = '';
  selectedLotId = '';
  selectedAnimalId: string | null = null;
  startsOn = '';
  endsOn = '';
  objective = '';
  currentAverageWeight: number | null = null;
  targetWeight: number | null = null;
  instructions = '';
  ingredients: {
    feedName: string;
    dailyQuantity: number | null;
    unit: string;
  }[] = [
    {
      feedName: '',
      dailyQuantity: null,
      unit: 'kg'
    }
  ];
  // Datos del Paso 3
  frequency = '2 veces al día';

  daysOfWeek: string[] = [
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
    'Domingo'
  ];

  schedules: {
    time: string;
    quantityPerAnimal: number | null;
  }[] = [
    {
      time: '07:00',
      quantityPerAnimal: null
    },
    {
      time: '17:00',
      quantityPerAnimal: null
    }
  ];

  constructor() {
    this.livestockStore.loadLots();
    this.livestockStore.loadAnimals();
  }

  addIngredient(): void {
    this.ingredients.push({
      feedName: '',
      dailyQuantity: null,
      unit: 'kg'
    });
  }

  removeIngredient(index: number): void {
    if (this.ingredients.length <= 1) {
      return;
    }

    this.ingredients.splice(index, 1);
  }

  get totalDailyQuantity(): number {
    return this.ingredients.reduce((total, ingredient) => {
      return total + (ingredient.dailyQuantity ?? 0);
    }, 0);
  }

  // Animales pertenecientes al lote seleccionado
  get filteredAnimals() {
    if (!this.selectedLotId) {
      return [];
    }

    return this.animals().filter(
      animal => animal.lotId === this.selectedLotId
    );
  }

  onLotChange(): void {
    // Al cambiar de lote, volvemos a seleccionar
    // "Todos los animales del lote"
    this.selectedAnimalId = null;
  }

  goBack(): void {
    this.router.navigate(['/livestock/feeding']);
  }

  nextStep(): void {
    if (this.currentStep === 1 && !this.isStepOneValid()) {
      return;
    }

    if (this.currentStep === 2 && !this.isStepTwoValid()) {
      return;
    }

    if (this.currentStep === 3 && !this.isStepThreeValid()) {
      return;
    }

    if (this.currentStep < 4) {
      this.currentStep++;
    }
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  private isStepOneValid(): boolean {
    return !!(
      this.planName.trim() &&
      this.selectedLotId &&
      this.startsOn &&
      this.endsOn &&
      this.objective.trim() &&
      this.currentAverageWeight !== null &&
      this.targetWeight !== null
    );
  }

  private isStepTwoValid(): boolean {
    return this.ingredients.length > 0 &&
      this.ingredients.every(
        ingredient =>
          ingredient.feedName.trim() !== '' &&
          ingredient.dailyQuantity !== null &&
          ingredient.dailyQuantity > 0 &&
          ingredient.unit !== ''
      );
  }

  addSchedule(): void {
    this.schedules.push({
      time: '',
      quantityPerAnimal: null
    });
  }

  toggleDay(day: string): void {
    if (this.daysOfWeek.includes(day)) {
      this.daysOfWeek = this.daysOfWeek.filter(
        selectedDay => selectedDay !== day
      );
    } else {
      this.daysOfWeek.push(day);
    }
  }

  get totalScheduledQuantity(): number {
    return this.schedules.reduce((total, schedule) => {
      return total + (schedule.quantityPerAnimal ?? 0);
    }, 0);
  }



  removeSchedule(index: number): void {
    if (this.schedules.length <= 1) {
      return;
    }

    this.schedules.splice(index, 1);
  }

  private isStepThreeValid(): boolean {
    return !!(
      this.frequency &&
      this.daysOfWeek.length > 0 &&
      this.schedules.length > 0 &&
      this.schedules.every(
        schedule =>
          schedule.time !== '' &&
          schedule.quantityPerAnimal !== null &&
          schedule.quantityPerAnimal > 0
      ) &&
      this.totalScheduledQuantity <= this.totalDailyQuantity
    );
  }
}
