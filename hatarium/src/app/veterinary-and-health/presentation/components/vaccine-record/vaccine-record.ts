import {Component, OnInit, inject, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Router, ActivatedRoute, RouterLink} from '@angular/router';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {AnimalDTO, ExternalDataService, VaccineDTO} from '../../../infrastructure/services/external-data';

@Component({
  selector: 'app-vaccine-record',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, MatCardModule, MatIconModule, MatButtonModule, TranslatePipe],
  templateUrl: './vaccine-record.html', // 👈 Nombre exacto de tu archivo HTML
  styleUrl: './vaccine-record.css'     // 👈 Nombre exacto de tu archivo CSS
})
export class VaccineRecordComponent implements OnInit {
  private externalData = inject(ExternalDataService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private translate = inject(TranslateService);

  public animal = signal<AnimalDTO | null>(null);
  public recentVaccines = signal<VaccineDTO[]>([]);
  public currentAnimalId = signal<string>('anm-047');

  // Propiedades estándar para [(ngModel)]
  public vaccineName: string = 'Fiebre Aftosa';
  public lotNumber: string = 'L2026-017';
  public appliedAt: string = new Date().toISOString().split('T')[0];
  public routeAdmin: string = 'Subcutánea';
  public dose: string = '2';
  public doseUnit: string = 'mL';
  public nextDoseAt: string = '2027-03-07';
  public observations: string = 'Verificada cadena de frío antes de la aplicación.';

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const animId = params['animalId'] || 'anm-047';
      this.currentAnimalId.set(animId);

      this.externalData.getAnimalDetail(animId).subscribe(data => {
        this.animal.set(data);
      });

      this.externalData.getVaccinesByAnimal(animId).subscribe(list => {
        this.recentVaccines.set(list);
      });
    });
  }

  public saveVaccine(): void {
    const newVaccine: VaccineDTO = {
      animalId: this.currentAnimalId(),
      veterinarianId: 'usr-003',
      name: this.vaccineName,
      dose: `${this.dose} ${this.doseUnit}`,
      doseUnit: this.doseUnit,
      laboratory: 'Laboratorio Veterinario Nacional',
      lotNumber: this.lotNumber,
      appliedAt: this.appliedAt,
      nextDoseAt: this.nextDoseAt,
      route: this.routeAdmin,
      applicationSite: 'Cuello',
      status: 'completed',
      observations: this.observations
    };

    this.externalData.createVaccine(newVaccine).subscribe(() => {
      alert(this.translate.instant('VACCINE.ALERT_SUCCESS'));
      this.router.navigate(['/veterinary/appointments']);
    });
  }
}
