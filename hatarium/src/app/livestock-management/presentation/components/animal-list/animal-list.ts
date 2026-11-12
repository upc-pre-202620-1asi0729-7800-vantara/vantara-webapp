import {ChangeDetectionStrategy, Component, computed, inject, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';

import { MatCard } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatFormField } from '@angular/material/form-field';
import { MatSelect, MatOption } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import {TranslatePipe} from '@ngx-translate/core';
import {LivestockStore} from '../../../application/livestock-store';
import {VeterinaryStore} from '../../../../veterinary-and-health/application/veterinary.store';
import {Animal} from '../../../domain/model/animal.entity';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-animal-list',
  imports: [
    FormsModule,
    MatCard,
    MatButton,
    MatIcon,
    MatFormField,
    MatSelect,
    MatOption,
    MatTableModule,
    TranslatePipe,
  ],
  templateUrl: './animal-list.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './animal-list.css'
})

export class AnimalList {

  private livestockStore = inject(LivestockStore);
  private veterinaryStore = inject(VeterinaryStore);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  animals = this.livestockStore.animals;
  lots = this.livestockStore.lots;
  records = this.veterinaryStore.records;

  searchTerm = signal('');
  selectedLot = signal('');
  selectedSex = signal('');
  selectedBreed = signal('');

  constructor() {
    this.livestockStore.loadAnimals(true);
    this.livestockStore.loadLots();
    this.veterinaryStore.loadMedicalRecords();

    // Pre-filters the list when arriving from the lots view (?lot=lot-001).
    const lotFilter = this.route.snapshot.queryParamMap.get('lot');
    if (lotFilter) {
      this.selectedLot.set(lotFilter);
    }
  }

  totalAnimals = computed(() =>
    this.animals().length
  );

  totalCalves = computed(() => this.animals().filter(animal =>
    animal.status === 'active' && animal.isCalf()).length);

  activeLots = computed(() =>
    this.lots().filter(lot => lot.status === 'active').length
  );

  breeds = computed(() =>
    [...new Set(
      this.animals().map(animal => animal.breed)
    )]
  );

  filteredAnimals = computed(() => {

    const search = this.searchTerm().toLowerCase();

    return this.animals().filter((animal: Animal) => {

      const matchesSearchTerm =
        !search ||
        animal.name.toLowerCase().includes(search) ||
        animal.earTag.toLowerCase().includes(search) ||
        animal.breed.toLowerCase().includes(search);

      const matchesLot = !this.selectedLot() || animal.lotId === this.selectedLot();
      const matchesSex = !this.selectedSex() || animal.sex === this.selectedSex();
      const matchesBreed = !this.selectedBreed() || animal.breed === this.selectedBreed();

      return (matchesSearchTerm && matchesLot && matchesSex && matchesBreed);
    });
  });

  // PAGINACIÓN
  pageSize = 10;
  currentPage = signal(1);

  totalPages = computed(() =>
    Math.ceil(this.filteredAnimals().length / this.pageSize)
  );

  paginatedAnimals = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    const end = start + this.pageSize;

    return this.filteredAnimals().slice(start, end);
  });

  pages = computed(() =>
    Array.from(
      { length: this.totalPages() },
      (_, index) => index + 1
    )
  );

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages()) {
      return;
    }

    this.currentPage.set(page);
  }

  previousPage() {
    this.goToPage(this.currentPage() - 1);
  }

  nextPage() {
    this.goToPage(this.currentPage() + 1);
  }

  getLotName(lotId: string): string {
    const lot = this.lots().find(lot => lot.id === lotId);

    return lot?.name ?? lotId;
  }

  /** Latest veterinary check date for an animal, or a dash when there are no records. */
  lastCheckDate(animalId: string): string {
    const records = this.records().filter(record => record.animalId === animalId);
    if (records.length === 0) return '—';

    const latest = records.reduce((newest, record) =>
      new Date(record.recordedAt).getTime() > new Date(newest.recordedAt).getTime()
        ? record
        : newest,
    );

    const date = new Date(latest.recordedAt);
    return isNaN(date.getTime())
      ? '—'
      : date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }

  setSearchTerm(value: string) {
    this.searchTerm.set(value);
    this.currentPage.set(1);
  }

  setLot(value: string) {
    this.selectedLot.set(value);
    this.currentPage.set(1);
  }

  setSex(value: string) {
    this.selectedSex.set(value);
    this.currentPage.set(1);
  }

  setBreed(value: string) {
    this.selectedBreed.set(value);
    this.currentPage.set(1);
  }

  goToAddAnimal() {
    this.router.navigate(['/livestock/animals/add']);
  }
  goToAnimalDetail(id: string) {
    this.router.navigate(['/livestock/animals', id]);
  }

}
