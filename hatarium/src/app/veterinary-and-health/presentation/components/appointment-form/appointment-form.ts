import { firstValueFrom } from 'rxjs';
import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { VeterinaryStore } from '../../../application/veterinary.store';
import { Appointment, AppointmentOrigin } from '../../../domain/model/appointment.entity';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  AnimalDTO,
  ExternalDataService,
  VeterinarianDTO
} from '../../../infrastructure/services/external-data';
import { SessionProfile } from '../../../../shared/application/session-profile';

@Component({
  selector: 'app-appointment-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, MatCardModule, MatIconModule, MatButtonModule, TranslatePipe],
  templateUrl: './appointment-form.html',
  styleUrl: './appointment-form.css'
})
export class AppointmentFormComponent implements OnInit {
  public store = inject(VeterinaryStore);
  private externalData = inject(ExternalDataService);
  private session = inject(SessionProfile);
  private router = inject(Router);

  readonly saving = signal(false);
  readonly saveError = signal<string | null>(null);
  readonly pendingAppointmentId = signal<string | null>(null);
  private pendingAnimalId = '';

  public availableAnimals = signal<AnimalDTO[]>([]);
  public availableVeterinarians = signal<VeterinarianDTO[]>([]);
  public userMap = signal<Record<string, string>>({});

  // US027 form fields.
  public selectedAnimalId = '';
  public visitType = 'Control sanitario';
  public reason = 'Revisión periódica de salud y control de peso';
  public scheduledDate = new Date().toISOString().split('T')[0];
  public scheduledTime = '10:30';
  public veterinarianId = '';
  public notes = 'Realizar chequeo preventivo en establo principal.';

  ngOnInit(): void {
    this.externalData.getAnimals().subscribe(animals => {
      this.availableAnimals.set(animals);
      if (animals.length > 0 && !this.selectedAnimalId) {
        this.selectedAnimalId = animals[0].id;
      }
    });

    this.externalData.getVeterinarians().subscribe(veterinarians => {
      this.availableVeterinarians.set(veterinarians);
      const signedInVeterinarian = this.session.user()?.id;
      if (!this.veterinarianId) {
        this.veterinarianId = veterinarians.find(vet => vet.id === signedInVeterinarian)?.id
          ?? veterinarians[0]?.id
          ?? '';
      }
    });

    this.externalData.getUsers().subscribe(users => {
      const map: Record<string, string> = {};
      users.forEach(user => { map[user.id] = user.fullName; });
      this.userMap.set(map);
    });
  }

  public selectedAnimal(): AnimalDTO | null {
    return this.availableAnimals().find(animal => animal.id === this.selectedAnimalId) ?? null;
  }

  public selectedVeterinarianName(): string {
    return this.availableVeterinarians().find(vet => vet.id === this.veterinarianId)?.fullName ?? '—';
  }

  public selectedRancherName(): string {
    const rancherId = this.selectedAnimal()?.rancherId;
    return rancherId ? this.userMap()[rancherId] ?? rancherId : '—';
  }

  public async saveAppointment(): Promise<void> {
    if (this.saving()) return;

    const animalExists = this.availableAnimals().some(animal => animal.id === this.selectedAnimalId);
    if (!this.reason.trim() || !this.scheduledDate || !this.scheduledTime || !animalExists) {
      this.saveError.set('FORM.ALERT_FILL');
      return;
    }

    const scheduledAtCombined = `${this.scheduledDate}T${this.scheduledTime}:00`;
    const veterinarianId = this.veterinarianId || this.session.user()?.id || 'usr-003';
    const requestedBy = this.session.user()?.id || veterinarianId;

    const newAppointment: Partial<Appointment> = {
      rancherId: this.selectedAnimal()?.rancherId || 'usr-002',
      veterinarianId,
      requestedBy,
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
        const appointment = await firstValueFrom(this.store.createAppointment(newAppointment));
        this.pendingAppointmentId.set(appointment.id);
      }
      await firstValueFrom(this.externalData.createAppointmentAnimal(this.pendingAppointmentId()!, this.pendingAnimalId));
      await this.router.navigate(['/veterinary/appointments']);
    } catch {
      this.saveError.set(this.pendingAppointmentId() ? 'FORM.ALERT_LINK_ERROR' : 'FORM.ALERT_ERROR');
    } finally {
      this.saving.set(false);
    }
  }
}
