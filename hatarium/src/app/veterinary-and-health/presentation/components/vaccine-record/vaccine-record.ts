
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
  AccessibleAnimalDTO,
  ExternalDataService,
  VaccineDTO
} from '../../../infrastructure/services/external-data';

import { SessionProfile } from '../../../../shared/application/session-profile';

@Component({
  selector: 'app-vaccine-record',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    TranslatePipe
  ],
  templateUrl: './vaccine-record.html',
  styleUrl: './vaccine-record.css'
})
export class VaccineRecordComponent implements OnInit {

  private externalData = inject(ExternalDataService);
  private session = inject(SessionProfile);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  public animal = signal<AnimalDTO | null>(null);

  public availableAnimals = signal<AccessibleAnimalDTO[]>([]);

  public recentVaccines = signal<VaccineDTO[]>([]);

  public currentAnimalId = signal<string>('');

  public currentAppointmentId = signal<string>('');

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
  public observations =
    'Verificada cadena de frío antes de la aplicación.';

  public get vaccineName(): string {
    return this.vaccineNameOption === 'Otra'
      ? this.customVaccineName
      : this.vaccineNameOption;
  }

  ngOnInit(): void {

    this.externalData.getAccessibleAnimals().subscribe(animals => {

      this.availableAnimals.set(animals);

      const queryAnimal =
        this.route.snapshot.queryParamMap.get('animalId');

      const queryAppointment =
        this.route.snapshot.queryParamMap.get('appointmentId');

      const initialAnimal =
        queryAnimal || animals[0]?.id;

      if (!initialAnimal) {
        return;
      }

      const accessibleAnimal = animals.find(
        item => item.id === initialAnimal
      );

      const initialAppointment =
        queryAppointment || accessibleAnimal?.appointmentId;

      if (!initialAppointment) {
        this.saveError.set('VACCINE.ALERT_ERROR');
        return;
      }

      this.selectAnimal(initialAnimal, initialAppointment);
    });
  }

  public selectAnimal(
    animalId: string,
    appointmentId?: string
  ): void {

    const accessibleAnimal = this.availableAnimals().find(
      item => item.id === animalId
    );

    const selectedAppointment =
      appointmentId || accessibleAnimal?.appointmentId;

    if (!selectedAppointment) {
      this.saveError.set('VACCINE.ALERT_ERROR');
      return;
    }

    this.currentAnimalId.set(animalId);
    this.currentAppointmentId.set(selectedAppointment);

    this.saveError.set('');

    this.externalData.getAppointmentAnimalDetail(
      selectedAppointment,
      animalId
    ).subscribe({
      next: data => this.animal.set(data),
      error: () => {
        this.animal.set(null);
        this.saveError.set('VACCINE.ALERT_ERROR');
      }
    });

    this.externalData.getVaccinesByAnimal(animalId)
      .subscribe(list => this.recentVaccines.set(list));
  }

  public saveVaccine(): void {

    if (this.saving()) {
      return;
    }

    if (
      !this.currentAnimalId() ||
      !this.currentAppointmentId() ||
      !(this.dose > 0) ||
      !this.vaccineName ||
      !this.lotNumber ||
      !this.appliedAt
    ) {
      this.saveError.set('VACCINE.ALERT_FILL');
      return;
    }

    this.saving.set(true);
    this.saveError.set('');

    const newVaccine: VaccineDTO = {
      appointmentId: this.currentAppointmentId(),
      animalId: this.currentAnimalId(),
      veterinarianId: this.session.userId(),
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
