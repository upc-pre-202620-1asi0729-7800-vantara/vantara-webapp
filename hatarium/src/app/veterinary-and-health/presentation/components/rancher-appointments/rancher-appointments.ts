import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { VeterinaryStore } from '../../../application/veterinary.store';
import {
  AnimalDTO,
  ExternalDataService
} from '../../../infrastructure/services/external-data';
import { SessionProfile } from '../../../../shared/application/session-profile';
import { AppointmentAnimal } from '../../../domain/model/appointment-animal.entity';

@Component({
  selector: 'app-rancher-appointments',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, MatTabsModule, TranslatePipe],
  templateUrl: './rancher-appointments.html',
  styleUrl: './rancher-appointments.css'
})
export class RancherAppointmentsComponent implements OnInit {
  public store = inject(VeterinaryStore);
  private externalData = inject(ExternalDataService);
  private session = inject(SessionProfile);
  private router = inject(Router);

  public animals = signal<AnimalDTO[]>([]);
  public appointmentAnimalMap = signal<Record<string, string>>({});
  public veterinarianMap = signal<Record<string, string>>({});

  public readonly rancherAppointments = computed(() => {
    const userId = this.session.user()?.id;
    if (!userId) return [];
    return this.store.appointments()
      .filter(appointment => appointment.rancherId === userId)
      .sort((first, second) =>
        new Date(second.scheduledAt).getTime() - new Date(first.scheduledAt).getTime()
      );
  });

  public readonly upcomingAppointments = computed(() =>
    this.rancherAppointments().filter(appointment => appointment.status === 'scheduled')
  );

  public readonly completedAppointments = computed(() =>
    this.rancherAppointments().filter(appointment => appointment.status === 'completed')
  );

  public readonly animalHealth = computed(() => {
    const records = this.store.records();
    return this.animals().map(animal => {
      const animalRecords = records.filter(record => record.animalId === animal.id);
      const latest = [...animalRecords].sort((first, second) =>
        new Date(second.recordedAt).getTime() - new Date(first.recordedAt).getTime()
      )[0];
      return {
        animal,
        latestRecord: latest ?? null,
        recordCount: animalRecords.length
      };
    }).filter(item => item.recordCount > 0);
  });

  ngOnInit(): void {
    this.store.loadAppointments();
    this.store.loadMedicalRecords();

    this.externalData.getAnimals().subscribe(list => this.animals.set(list));
    this.externalData.getVeterinarians().subscribe(vets => {
      const map: Record<string, string> = {};
      vets.forEach(vet => { map[vet.id] = vet.fullName; });
      this.veterinarianMap.set(map);
    });
    this.externalData.getAppointmentAnimals().subscribe(relations => {
      const map: Record<string, string> = {};
      relations.forEach(relation => { map[relation.appointmentId] = relation.animalId; });
      this.appointmentAnimalMap.set(map);
    });
  }

  public animalLabel(animalId: string): string {
    const animal = this.animals().find(item => item.id === animalId);
    return animal ? `#${animal.earTag} · ${animal.name}` : animalId;
  }

  public veterinarianName(vetId: string): string {
    return this.veterinarianMap()[vetId] || vetId;
  }

  public statusKey(status: string): string {
    if (status === 'completed') return 'DETAIL.STATUS_COMPLETED';
    if (status === 'cancelled') return 'DETAIL.STATUS_CANCELLED';
    return 'DETAIL.STATUS_SCHEDULED';
  }

  public goToAnimal(animalId: string): void {
    void this.router.navigate(['/livestock/animals', animalId]);
  }
}
