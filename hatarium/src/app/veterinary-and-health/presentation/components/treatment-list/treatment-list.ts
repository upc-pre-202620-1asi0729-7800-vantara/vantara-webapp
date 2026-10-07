import {Component, OnInit, inject, signal, computed} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Router, ActivatedRoute, RouterLink} from '@angular/router';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {VeterinaryStore} from '../../../application/veterinary.store';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {AnimalDTO, ExternalDataService} from '../../../infrastructure/services/external-data';

@Component({
  selector: 'app-treatment-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, MatCardModule, MatIconModule, MatButtonModule, TranslatePipe],
  templateUrl: './treatment-list.html',
  styleUrl: './treatment-list.css'
})
export class TreatmentListComponent implements OnInit {
  public store = inject(VeterinaryStore);
  private externalData = inject(ExternalDataService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private translate = inject(TranslateService);

  public animal = signal<AnimalDTO | null>(null);
  public medicationsList = signal<any[]>([]);
  public currentAnimalId = signal<string>('anm-047');
  public currentRecordId = signal<string>('mr-001');

  // Campos del Formulario (Mockup 8/13)
  public treatmentType: string = 'Preventivo';
  public purpose: string = 'Tratamiento rutinario';
  public selectedMedicationId: string = 'med-001';
  public dose: string = '5';
  public doseUnit: string = 'mL';
  public routeAdmin: string = 'Intramuscular';
  public frequencyHours: string = '24';
  public durationDays: number = 7;
  public instructions: string = 'Completar esquema indicado cada 24 horas.';
  public notes: string = 'Monitorear la respuesta del animal.';

  ngOnInit(): void {
    this.store.loadTreatments();

    this.route.queryParams.subscribe(params => {
      const animId = params['animalId'] || 'anm-047';
      const recId = params['recordId'] || 'mr-001';

      this.currentAnimalId.set(animId);
      this.currentRecordId.set(recId);

      this.externalData.getAnimalDetail(animId).subscribe(data => {
        this.animal.set(data);
      });
    });

    this.externalData.getMedications().subscribe(meds => {
      this.medicationsList.set(meds);
    });
  }

  public saveTreatment(): void {
    const newTreatment = {
      medicalRecordId: this.currentRecordId(),
      animalId: this.currentAnimalId(),
      medicationId: this.selectedMedicationId,
      treatmentType: this.treatmentType,
      dose: `${this.dose} ${this.doseUnit}`,
      doseUnit: this.doseUnit,
      route: this.routeAdmin,
      frequencyHours: this.frequencyHours,
      durationDays: this.durationDays,
      scheduledAt: new Date().toISOString().split('T')[0],
      administeredAt: new Date().toISOString().split('T')[0],
      nextDate: new Date().toISOString().split('T')[0],
      status: 'completed',
      instructions: this.instructions
    };

    this.store.createTreatment(newTreatment);
    alert(this.translate.instant('TREATMENT.ALERT_SUCCESS'));

    this.router.navigate(['/veterinary/vaccines/new'], {
      queryParams: { animalId: this.currentAnimalId() }
    });
  }
}
