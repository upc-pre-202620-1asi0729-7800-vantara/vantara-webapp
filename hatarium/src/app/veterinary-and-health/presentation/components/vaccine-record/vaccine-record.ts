import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  AnimalDTO,
  ExternalDataService,
  VaccineDTO
} from '../../../infrastructure/services/external-data';
import { SessionProfile } from '../../../../shared/application/session-profile';

@Component({
  selector: 'app-vaccine-record',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, MatCardModule, MatIconModule, MatButtonModule, TranslatePipe],
  templateUrl: './vaccine-record.html',
  styleUrl: './vaccine-record.css'
})
export class VaccineRecordComponent implements OnInit {
  private externalData = inject(ExternalDataService);
  private session = inject(SessionProfile);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  public animal = signal<AnimalDTO | null>(null);
  public availableAnimals = signal<AnimalDTO[]>([]);
  public recentVaccines = signal<VaccineDTO[]>([]);
  public currentAnimalId = signal<string>('anm-047');
  public saving = signal<boolean>(false);
  public saveError = signal<string>('');

  // US030 form fields.
  public vaccineNameOption = 'Fiebre Aftosa';
  public vaccineType = 'Preventiva';
  public customVaccineName = '';
  public lotNumber = 'L2026-017';
  public appliedAt = new Date().toISOString().split('T')[0];
  public routeAdmin = 'Subcutánea';
  public dose = 2;
  public doseUnit = 'mL';
  public nextDoseAt = '2027-03-07';
  public laboratory = 'Laboratorio Veterinario Nacional';
  public applicationSite = 'Cuello (lado izquierdo)';
  public observations = 'Verificada cadena de frío antes de la aplicación.';

  public get vaccineName(): string {
    return this.vaccineNameOption === 'Otra' ? this.customVaccineName : this.vaccineNameOption;
  }

  ngOnInit(): void {
    this.externalData.getAnimals().subscribe(animals => {
      this.availableAnimals.set(animals);
      const queryAnimal = this.route.snapshot.queryParamMap.get('animalId');
      const initial = queryAnimal || animals[0]?.id || 'anm-047';
      this.selectAnimal(initial);
    });
  }

  public selectAnimal(animalId: string): void {
    this.currentAnimalId.set(animalId);
    this.externalData.getAnimalDetail(animalId).subscribe(data => this.animal.set(data));
    this.externalData.getVaccinesByAnimal(animalId).subscribe(list => this.recentVaccines.set(list));
  }

  public saveVaccine(): void {
    if (this.saving()) return;

    if (!(this.dose > 0) || !this.vaccineName || !this.lotNumber || !this.appliedAt) {
      this.saveError.set('VACCINE.ALERT_FILL');
      return;
    }

    this.saving.set(true);
    this.saveError.set('');

    const newVaccine: VaccineDTO = {
      animalId: this.currentAnimalId(),
      veterinarianId: this.session.user()?.id ?? 'usr-003',
      vaccineType: this.vaccineType,
      name: this.vaccineName,
      dose: Number(this.dose),
      doseUnit: this.doseUnit,
      laboratory: this.laboratory,
      lotNumber: this.lotNumber,
      appliedAt: this.appliedAt,
      nextDoseAt: this.nextDoseAt,
      route: this.routeAdmin,
      applicationSite: this.applicationSite,
      status: 'completed',
      observations: this.observations
    };

    this.externalData.createVaccine(newVaccine).subscribe({
      next: () => {
        this.saving.set(false);
        void this.router.navigate(['/veterinary/appointments']);
      },
      error: () => {
        this.saving.set(false);
        this.saveError.set('VACCINE.ALERT_ERROR');
      }
    });
  }
}
