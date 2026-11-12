import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { firstValueFrom } from 'rxjs';

import { VeterinaryStore } from '../../../application/veterinary.store';
import { Appointment, AppointmentOrigin } from '../../../domain/model/appointment.entity';
import {
  AnimalDTO,
  ExternalDataService,
  VeterinarianDTO,
} from '../../../infrastructure/services/external-data';
import { SessionProfile } from '../../../../shared/application/session-profile';

/**
 * Rancher-facing appointment request form.
 *
 * Unlike the veterinarian form, this screen only lets the signed-in rancher
 * choose one of their own animals and request a visit. The veterinarian is
 * selected from the available catalogue so the appointment satisfies the
 * backend `appointments.veterinarian_id` foreign key.
 */
@Component({
  selector: 'app-rancher-appointment-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    TranslatePipe,
  ],
  templateUrl: './rancher-appointment-form.html',
  styleUrl: './rancher-appointment-form.css',
})
export class RancherAppointmentFormComponent implements OnInit {
  public store = inject(VeterinaryStore);
  private externalData = inject(ExternalDataService);
  private session = inject(SessionProfile);
  private router = inject(Router);

  public animals = signal<AnimalDTO[]>([]);
  public veterinarians = signal<VeterinarianDTO[]>([]);
  public saving = signal(false);
  public errorMessage = signal<string | null>(null);

  // The backend returns only the authenticated rancher's animals, but the
  // local fixture is shared, so we keep the filter as a safety net.
  public readonly myAnimals = computed(() => {
    const all = this.animals();
    const userId = this.session.userId();
    if (!userId) return all;

    const mine = all.filter(animal => animal.rancherId === userId);
    return mine.length ? mine : all;
  });

  public selectedAnimalId = '';
  public veterinarianId = '';
  public reason = '';
  public scheduledDate = new Date().toISOString().split('T')[0];
  public scheduledTime = '09:00';
  public readonly minDate = new Date().toISOString().split('T')[0];

  ngOnInit(): void {
    this.externalData.getAnimals().subscribe(list => {
      this.animals.set(list);
      if (!this.selectedAnimalId) {
        this.selectedAnimalId = this.myAnimals()[0]?.id ?? '';
      }
    });

    this.externalData.getVeterinarians().subscribe(list => {
      this.veterinarians.set(list);
      if (!this.veterinarianId) {
        this.veterinarianId = list[0]?.id ?? '';
      }
    });
  }

  public selectedAnimal(): AnimalDTO | null {
    return this.myAnimals().find(animal => animal.id === this.selectedAnimalId) ?? null;
  }

  public selectedVeterinarianName(): string {
    return this.veterinarians().find(vet => vet.id === this.veterinarianId)?.fullName ?? '—';
  }

  public async saveAppointment(): Promise<void> {
    if (this.saving()) return;

    const animal = this.selectedAnimal();
    if (!animal || !this.reason.trim() || !this.scheduledDate || !this.scheduledTime) {
      this.errorMessage.set('RANCHER_APPOINTMENTS.REQUIRED');
      return;
    }

    if (!this.veterinarianId) {
      this.errorMessage.set('RANCHER_APPOINTMENTS.NO_VETS');
      return;
    }

    const scheduledAt = `${this.scheduledDate}T${this.scheduledTime}:00`;
    const appointment: Partial<Appointment> = {
      rancherId: this.session.userId() || animal.rancherId,
      veterinarianId: this.veterinarianId,
      // Backend FK: appointments.requested_by -> iam_accounts.id (not users.id).
      requestedBy: this.session.userId() || animal.rancherId,
      origin: 'RANCHER_REQUEST' as AppointmentOrigin,
      scheduledAt,
      reason: this.reason.trim(),
      status: 'scheduled',
      createdAt: new Date().toISOString().split('T')[0],
    };

    this.saving.set(true);
    this.errorMessage.set(null);

    try {
      const created = await firstValueFrom(this.store.createAppointment(appointment));
      await firstValueFrom(this.externalData.createAppointmentAnimal(created.id, animal.id));
      await this.router.navigate(['/rancher/appointments'], { queryParams: { created: '1' } });
    } catch {
      this.errorMessage.set('RANCHER_APPOINTMENTS.ERROR');
    } finally {
      this.saving.set(false);
    }
  }
}
