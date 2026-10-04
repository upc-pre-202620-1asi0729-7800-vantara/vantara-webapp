import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { VeterinaryStore } from '../../../application/veterinary.store';
import {ExternalDataService} from '../../../infrastructure/services/external-data';

@Component({
  selector: 'app-treatment-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './treatment-list.html',
  styleUrl: './treatment-list.css'
})
export class TreatmentListComponent implements OnInit {
  public store = inject(VeterinaryStore);
  private externalData = inject(ExternalDataService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  public medicationsList = signal<any[]>([]);
  public selectedMedicationId = signal('med-001');
  public currentAnimalId = signal<string>('anm-047');
  public currentRecordId = signal<string>('mr-001');

  public treatmentType = signal('Preventivo');
  public dose = signal('10 ml');
  public doseUnit = signal('ml');
  public routeAdmin = signal('Intramuscular');
  public frequencyHours = signal('24');
  public durationDays = signal(5);
  public instructions = signal('Completar esquema indicado.');

  // Signal computado: Filtra en tiempo real los tratamientos del animal seleccionado
  public animalTreatments = computed(() => {
    return this.store.treatments().filter(t => t.animalId === this.currentAnimalId());
  });

  ngOnInit(): void {
    this.store.loadTreatments();

    // Obtener parámetros dinámicos de la URL
    this.route.queryParams.subscribe(params => {
      this.currentAnimalId.set(params['animalId'] || 'anm-047');
      this.currentRecordId.set(params['recordId'] || 'mr-001');
    });

    // Cargar la lista de medicamentos desde la Fake API
    this.externalData.getMedications().subscribe(meds => {
      this.medicationsList.set(meds);
    });
  }

  public saveTreatment(): void {
    const newTreatment = {
      medicalRecordId: this.currentRecordId(),
      animalId: this.currentAnimalId(),
      medicationId: this.selectedMedicationId(),
      treatmentType: this.treatmentType(),
      dose: this.dose(),
      doseUnit: this.doseUnit(),
      route: this.routeAdmin(),
      frequencyHours: this.frequencyHours(),
      durationDays: this.durationDays(),
      scheduledAt: new Date().toISOString().split('T')[0],
      administeredAt: new Date().toISOString().split('T')[0],
      nextDate: new Date().toISOString().split('T')[0],
      status: 'completed',
      instructions: this.instructions()
    };

    this.store.createTreatment(newTreatment);
    alert('Tratamiento prescrito correctamente (US029).');
    this.router.navigate(['/veterinary/appointments']);
  }
}
