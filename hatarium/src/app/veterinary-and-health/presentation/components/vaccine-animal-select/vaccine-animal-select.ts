import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  AnimalDTO,
  ExternalDataService
} from '../../../infrastructure/services/external-data';

@Component({
  selector: 'app-vaccine-animal-select',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, MatCardModule, MatIconModule, MatButtonModule, TranslatePipe],
  templateUrl: './vaccine-animal-select.html',
  styleUrl: './vaccine-animal-select.css'
})
export class VaccineAnimalSelectComponent implements OnInit {
  private externalData = inject(ExternalDataService);
  private router = inject(Router);

  public animals = signal<AnimalDTO[]>([]);
  public searchTerm = signal<string>('');

  public readonly filteredAnimals = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    return this.animals().filter(animal => !term
      || animal.name.toLowerCase().includes(term)
      || animal.earTag.toLowerCase().includes(term)
      || (animal.lotName || '').toLowerCase().includes(term)
      || animal.breed.toLowerCase().includes(term));
  });

  ngOnInit(): void {
    this.externalData.getAnimals().subscribe(list => this.animals.set(list));
  }

  public goToVaccinate(animalId: string): void {
    void this.router.navigate(['/veterinary/vaccines/new'], { queryParams: { animalId } });
  }
}
