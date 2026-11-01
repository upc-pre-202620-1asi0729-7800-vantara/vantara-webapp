import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  AnimalDTO,
  ExternalDataService,
  VaccineDTO
} from '../../../infrastructure/services/external-data';

@Component({
  selector: 'app-vaccine-center',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatIconModule, MatButtonModule, TranslatePipe],
  templateUrl: './vaccine-center.html',
  styleUrl: './vaccine-center.css'
})
export class VaccineCenterComponent implements OnInit {
  private externalData = inject(ExternalDataService);
  private router = inject(Router);

  public vaccines = signal<VaccineDTO[]>([]);
  public animals = signal<AnimalDTO[]>([]);
  public searchTerm = signal<string>('');
  public statusFilter = signal<'ALL' | 'COMPLETED' | 'PENDING'>('ALL');

  public readonly filteredVaccines = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    return this.vaccines().filter(vaccine => {
      const animal = this.animals().find(item => item.id === vaccine.animalId);
      const matchesTerm = !term
        || vaccine.name.toLowerCase().includes(term)
        || vaccine.lotNumber.toLowerCase().includes(term)
        || (animal?.name || '').toLowerCase().includes(term)
        || (animal?.earTag || '').toLowerCase().includes(term);
      const matchesStatus = this.statusFilter() === 'ALL'
        || (this.statusFilter() === 'COMPLETED' && vaccine.status === 'completed')
        || (this.statusFilter() === 'PENDING' && vaccine.status !== 'completed');
      return matchesTerm && matchesStatus;
    });
  });

  public readonly pendingVaccines = computed(() =>
    this.vaccines().filter(vaccine => vaccine.status !== 'completed')
  );

  public readonly appliedThisMonth = computed(() => {
    const now = new Date();
    return this.vaccines().filter(vaccine => {
      if (vaccine.status !== 'completed' || !vaccine.appliedAt) return false;
      const date = new Date(vaccine.appliedAt);
      return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth();
    }).length;
  });

  ngOnInit(): void {
    this.externalData.getVaccines().subscribe(list => this.vaccines.set(list));
    this.externalData.getAnimals().subscribe(list => this.animals.set(list));
  }

  public animalLabel(animalId: string): string {
    const animal = this.animals().find(item => item.id === animalId);
    return animal ? `#${animal.earTag} · ${animal.name}` : animalId;
  }

  public isOverdue(nextDoseAt: string): boolean {
    if (!nextDoseAt) return false;
    return new Date(nextDoseAt).getTime() < Date.now();
  }

  public goToRegister(): void {
    void this.router.navigate(['/veterinary/vaccines/new']);
  }
}
