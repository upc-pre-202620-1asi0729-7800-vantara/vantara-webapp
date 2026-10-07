import { firstValueFrom } from 'rxjs';
import {Component, OnInit, inject, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {VeterinaryStore} from '../../../application/veterinary.store';
import {VeterinaryApiClient} from '../../../infrastructure/veterinary-api-client';
import {Appointment, AppointmentOrigin} from '../../../domain/model/appointment.entity';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {AnimalDTO, ExternalDataService} from '../../../infrastructure/services/external-data';

@Component({
  selector: 'app-appointment-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, MatCardModule, MatIconModule, MatButtonModule, TranslatePipe],
  templateUrl: './appointment-form.html',
  styleUrl: './appointment-form.css'
})
export class AppointmentFormComponent implements OnInit {
  public store = inject(VeterinaryStore);
  private apiClient = inject(VeterinaryApiClient);
  private externalData = inject(ExternalDataService);
  private router = inject(Router);
  private translate = inject(TranslateService);

  readonly saving = signal(false);
  readonly saveError = signal<string | null>(null);
  readonly pendingAppointmentId = signal<string | null>(null);
  private pendingAnimalId = '';

  public availableAnimals = signal<AnimalDTO[]>([]);

  // Campos del Formulario (US027)
  public selectedAnimalId: string = 'anm-047';
  public visitType: string = 'Control sanitario';
  public reason: string = 'Revisión periódica de salud y control de peso';
  public scheduledDate: string = new Date().toISOString().split('T')[0];
  public scheduledTime: string = '10:30';
  public veterinarianId: string = 'usr-003';
  public notes: string = 'Realizar chequeo preventivo en establo principal.';

  ngOnInit(): void {
    this.externalData.getAnimals().subscribe(animals => {
      this.availableAnimals.set(animals);
      if (animals.length > 0) {
        this.selectedAnimalId = animals[0].id;
      }
    });
  }

  public async saveAppointment(): Promise<void> {
    if (this.saving()) return;
    if (!this.reason.trim() || !this.scheduledDate || !this.scheduledTime || !this.availableAnimals().some(animal => animal.id === this.selectedAnimalId)) {
      alert(this.translate.instant('FORM.ALERT_FILL'));
      return;
    }

    const scheduledAtCombined = `${this.scheduledDate}T${this.scheduledTime}:00`;

    // Asignación explícita con el tipo Partial<Appointment> y casteo de AppointmentOrigin
    const newApt: Partial<Appointment> = {
      rancherId: 'usr-002',
      veterinarianId: this.veterinarianId,
      requestedBy: 'usr-003',
      origin: 'TECHNICAL_VISIT' as AppointmentOrigin,
      scheduledAt: scheduledAtCombined,
      reason: this.reason,
      status: 'scheduled',
      createdAt: new Date().toISOString().split('T')[0]
    };

    this.saving.set(true);
    this.saveError.set(null);
    try {
      if (!this.pendingAppointmentId()) {
        this.pendingAnimalId = this.selectedAnimalId;
        const appointment = await firstValueFrom(this.apiClient.createAppointment(newApt));
        this.pendingAppointmentId.set(appointment.id);
      }
      await firstValueFrom(this.externalData.createAppointmentAnimal(this.pendingAppointmentId()!, this.pendingAnimalId));
      this.store.loadAppointments();
      alert(this.translate.instant('FORM.ALERT_SUCCESS'));
      await this.router.navigate(['/veterinary/appointments']);
    } catch {
      this.saveError.set(this.pendingAppointmentId() ? 'animalAppointments.linkError' : 'FORM.ALERT_ERROR');
    } finally {
      this.saving.set(false);
    }
  }
}
