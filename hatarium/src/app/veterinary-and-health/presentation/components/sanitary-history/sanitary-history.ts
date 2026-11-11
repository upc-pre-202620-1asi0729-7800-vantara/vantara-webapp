import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { VeterinaryStore } from '../../../application/veterinary.store';
import {
  AnimalDTO,
  ExternalDataService,
  VaccineDTO
} from '../../../infrastructure/services/external-data';
import { AppointmentAnimal } from '../../../domain/model/appointment-animal.entity';

@Component({
  selector: 'app-sanitary-history',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatIconModule, MatButtonModule, MatTabsModule, TranslatePipe],
  templateUrl: './sanitary-history.html',
  styleUrl: './sanitary-history.css'
})
export class SanitaryHistoryComponent implements OnInit {
  public store = inject(VeterinaryStore);
  private externalData = inject(ExternalDataService);
  private router = inject(Router);

  public animals = signal<AnimalDTO[]>([]);
  public vaccines = signal<VaccineDTO[]>([]);
  public appointmentAnimalMap = signal<Record<string, string>>({});
  public selectedAnimalId = signal<string>('');
  public searchTerm = signal<string>('');

  public readonly filteredAnimals = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    return this.animals()
      .filter(animal => this.hasHistory(animal.id))
      .filter(animal => !term
        || animal.name.toLowerCase().includes(term)
        || animal.earTag.toLowerCase().includes(term)
        || (animal.lotName || '').toLowerCase().includes(term));
  });

  public readonly selectedAnimal = computed(() =>
    this.animals().find(animal => animal.id === this.selectedAnimalId()) ?? null
  );

  public readonly animalRecords = computed(() =>
    this.store.records().filter(record => record.animalId === this.selectedAnimalId())
  );

  public readonly animalTreatments = computed(() =>
    this.store.treatments().filter(treatment => treatment.animalId === this.selectedAnimalId())
  );

  public readonly animalVaccines = computed(() =>
    this.vaccines().filter(vaccine => vaccine.animalId === this.selectedAnimalId())
  );

  public readonly animalAppointments = computed(() => {
    const map = this.appointmentAnimalMap();
    return this.store.appointments().filter(appointment => map[appointment.id] === this.selectedAnimalId());
  });

  ngOnInit(): void {
    this.store.loadAppointments();
    this.store.loadMedicalRecords();
    this.store.loadTreatments();

    this.externalData.getAnimals().subscribe(list => {
      this.animals.set(list);
      const withHistory = list.find(animal => this.hasHistory(animal.id));
      if (withHistory && !this.selectedAnimalId()) {
        this.selectedAnimalId.set(withHistory.id);
      }
    });

    this.externalData.getVaccines().subscribe(list => this.vaccines.set(list));
    this.externalData.getAppointmentAnimals().subscribe(relations => {
      const map: Record<string, string> = {};
      relations.forEach(relation => { map[relation.appointmentId] = relation.animalId; });
      this.appointmentAnimalMap.set(map);
    });
  }

  public hasHistory(animalId: string): boolean {
    return this.store.records().some(record => record.animalId === animalId)
      || this.store.treatments().some(treatment => treatment.animalId === animalId)
      || this.vaccines().some(vaccine => vaccine.animalId === animalId)
      || Object.values(this.appointmentAnimalMap()).includes(animalId);
  }

  public selectAnimal(animalId: string): void {
    this.selectedAnimalId.set(animalId);
  }

  public animalName(animalId: string): string {
    const animal = this.animals().find(item => item.id === animalId);
    return animal ? `#${animal.earTag} · ${animal.name}` : animalId;
  }

  public severityKey(severity: string): string {
    if (severity === 'high') return 'DETAIL.SEVERITY_HIGH';
    if (severity === 'medium') return 'DETAIL.SEVERITY_MEDIUM';
    return 'DETAIL.SEVERITY_LOW';
  }
}
