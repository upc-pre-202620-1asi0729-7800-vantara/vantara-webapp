import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {VeterinaryStore} from '../../../application/veterinary.store';
import {AnimalDTO, ExternalDataService} from '../../../infrastructure/services/external-data';

@Component({
  selector: 'app-clinical-history',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './clinical-history.html',
  styleUrl: './clinical-history.css'
})
export class ClinicalHistoryComponent implements OnInit {
  public store = inject(VeterinaryStore);
  private externalData = inject(ExternalDataService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  public animal = signal<AnimalDTO | null>(null);
  public currentAnimalId = signal<string>('anm-047');
  public currentAppointmentId = signal<string>('app-001');

  // Filtra los registros en el panel lateral por el animal actual
  public animalRecords = computed(() => {
    return this.store.records().filter(r => r.animalId === this.currentAnimalId());
  });

  public diagnosis = signal('');
  public symptoms = signal('');
  public severity = signal('low');
  public healthStatus = signal('healthy');
  public notes = signal('');

  ngOnInit(): void {
    this.store.loadMedicalRecords();

    this.route.queryParams.subscribe(params => {
      const animId = params['animalId'] || 'anm-047';
      const aptId = params['appointmentId'] || 'app-001';

      this.currentAnimalId.set(animId);
      this.currentAppointmentId.set(aptId);

      this.externalData.getAnimalDetail(animId).subscribe(data => {
        this.animal.set(data);
      });
    });
  }

  public saveDiagnosis(): void {
    if (!this.diagnosis() || !this.symptoms()) {
      alert('Por favor complete el diagnóstico y los síntomas obligatorios.');
      return;
    }

    const newRecord = {
      appointmentId: this.currentAppointmentId(),
      animalId: this.currentAnimalId(),
      veterinarianId: 'usr-003',
      recordedAt: new Date().toISOString().split('T')[0],
      symptoms: this.symptoms(),
      diagnosis: this.diagnosis(),
      severity: this.severity(),
      healthStatus: this.healthStatus(),
      notes: this.notes()
    };

    this.store.createMedicalRecord(newRecord);
    alert('Diagnóstico guardado exitosamente (US028).');

    this.router.navigate(['/veterinary/treatments'], {
      queryParams: {
        animalId: this.currentAnimalId(),
        appointmentId: this.currentAppointmentId()
      }
    });
  }
}
