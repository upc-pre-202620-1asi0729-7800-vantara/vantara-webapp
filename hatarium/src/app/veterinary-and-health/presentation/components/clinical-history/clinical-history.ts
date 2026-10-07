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
  selector: 'app-clinical-history',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, MatCardModule, MatIconModule, MatButtonModule, TranslatePipe],
  templateUrl: './clinical-history.html',
  styleUrl: './clinical-history.css'
})
export class ClinicalHistoryComponent implements OnInit {
  public store = inject(VeterinaryStore);
  private externalData = inject(ExternalDataService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private translate = inject(TranslateService);

  public animal = signal<AnimalDTO | null>(null);
  public currentAnimalId = signal<string>('anm-047');
  public currentAppointmentId = signal<string>('app-001');

  // Campos del Formulario (Mockup 16)
  public diagDate: string = new Date().toISOString().split('T')[0];
  public diagTime: string = '10:30';
  public diagnosis: string = '';
  public diagType: string = 'Clinico';
  public severity: string = 'Leve';
  public symptoms: string = '';
  public causeProbable: string = '';
  public notes: string = '';

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
    if (!this.diagnosis || !this.symptoms) {
      alert(this.translate.instant('CLINICAL.ALERT_FILL'));
      return;
    }

    const newRecord = {
      appointmentId: this.currentAppointmentId(),
      animalId: this.currentAnimalId(),
      veterinarianId: 'usr-003',
      recordedAt: this.diagDate,
      symptoms: this.symptoms,
      diagnosis: this.diagnosis,
      severity: this.severity === 'Leve' ? 'low' : this.severity === 'Moderada' ? 'medium' : 'high',
      healthStatus: 'healthy',
      notes: this.notes
    };

    this.store.createMedicalRecord(newRecord);
    alert(this.translate.instant('CLINICAL.ALERT_SUCCESS'));

    this.router.navigate(['/veterinary/treatments/new'], {
      queryParams: {
        animalId: this.currentAnimalId(),
        appointmentId: this.currentAppointmentId()
      }
    });
  }
}
