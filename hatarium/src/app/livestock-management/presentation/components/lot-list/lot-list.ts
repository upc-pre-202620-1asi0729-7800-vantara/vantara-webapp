import {ChangeDetectionStrategy, Component, computed, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {TranslatePipe} from '@ngx-translate/core';
import {FormsModule} from '@angular/forms';

import {LivestockStore} from '../../../application/livestock-store';
import {Animal} from '../../../domain/model/animal.entity';
import {SessionProfile} from '../../../../shared/application/session-profile';

/** Aggregated data shown for each lot card. */
interface LotSummary {
  id: string;
  name: string;
  purpose: string;
  status: string;
  animals: Animal[];
  males: number;
  females: number;
  calves: number;
  averageWeight: number;
}

@Component({
  selector: 'app-lot-list',
  imports: [RouterLink, MatIcon, MatButton, TranslatePipe, FormsModule],
  templateUrl: './lot-list.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './lot-list.css'
})
export class LotList {

  private livestockStore = inject(LivestockStore);
  private session = inject(SessionProfile);

  showCreateLot = false;
  newLotName = '';
  newLotPurpose = '';
  lotSaving = false;
  lotError = '';

  lots = this.livestockStore.lots;
  animals = this.livestockStore.animals;

  constructor() {
    this.livestockStore.loadLots();
    this.livestockStore.loadAnimals(true);
  }

  createLot(): void {
    if (this.lotSaving || !this.session.userId() || !this.newLotName.trim() || !this.newLotPurpose.trim()) {
      this.lotError = 'Completa el nombre y el propósito del lote.';
      return;
    }
    this.lotSaving = true;
    this.lotError = '';
    this.livestockStore.createLot({
      name: this.newLotName.trim(),
      purpose: this.newLotPurpose.trim(),
      status: 'active',
    }).subscribe({
      next: () => {
        this.lotSaving = false;
        this.newLotName = '';
        this.newLotPurpose = '';
        this.showCreateLot = false;
      },
      error: () => {
        this.lotSaving = false;
        this.lotError = 'No se pudo crear el lote. Revisa los datos e inténtalo nuevamente.';
      },
    });
  }

  totalLots = computed(() => this.lots().length);

  activeLots = computed(() =>
    this.lots().filter(lot => lot.status === 'active').length
  );

  assignedAnimals = computed(() =>
    this.animals().filter(animal => !!animal.lotId).length
  );

  unassignedAnimals = computed(() =>
    this.animals().filter(animal => !animal.lotId).length
  );

  readonly lotSummaries = computed<LotSummary[]>(() =>
    this.lots().map(lot => {
      const animals = this.animals().filter(animal => animal.lotId === lot.id);
      const females = animals.filter(animal => this.isFemale(animal)).length;
      const calves = animals.filter(animal => animal.isCalf()).length;
      const averageWeight = animals.length
        ? Math.round(animals.reduce((total, animal) => total + animal.weight, 0) / animals.length)
        : 0;

      return {
        id: lot.id,
        name: lot.name,
        purpose: lot.purpose,
        status: lot.status,
        animals,
        males: animals.length - females,
        females,
        calves,
        averageWeight
      };
    })
  );

  private isFemale(animal: Animal): boolean {
    const sex = animal.sex.toLowerCase();
    return sex === 'hembra' || sex === 'female';
  }
}
