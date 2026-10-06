import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject
} from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { LivestockStore } from '../../../application/livestock-store';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';


@Component({
  selector: 'app-animal-detail',
  imports: [
    MatButton,
    MatIcon
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

  animalId = this.route.snapshot.paramMap.get('id') ?? '';

  animal = computed(() =>
    this.animals().find(animal => animal.id === this.animalId)
  );

  constructor() {
    this.livestockStore.loadAnimals();
    this.livestockStore.loadLots();
  }

  getLotName(lotId: string): string {
    const lot = this.livestockStore.lots().find(lot => lot.id === lotId);
    return lot?.name ?? 'Sin lote';
  }

  getAge(birthDate: string): string {
    const birth = new Date(birthDate);
    const today = new Date();

    let age = today.getFullYear() - birth.getFullYear();

    const monthDifference = today.getMonth() - birth.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
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
