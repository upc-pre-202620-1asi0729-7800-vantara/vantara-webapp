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


@Component({
  selector: 'app-animal-detail',
  imports: [
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
  readonly selectedTab = signal<'general' | 'appointments'>('general');

  animal = computed(() =>
    this.animals().find(animal => animal.id === this.animalId())
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
