import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { VeterinaryStore } from '../../../application/veterinary.store';
import { VeterinaryApiClient } from '../../../infrastructure/veterinary-api-client';
import {AnimalDTO, ExternalDataService} from '../../../infrastructure/services/external-data';

@Component({
  selector: 'app-appointment-calendar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule
  ],
  templateUrl: './appointment-calendar.html',
  styleUrl: './appointment-calendar.css'
})
export class AppointmentCalendarComponent implements OnInit {
  public store = inject(VeterinaryStore);
  private apiClient = inject(VeterinaryApiClient); // 👈 Inyectado directamente
  private externalData = inject(ExternalDataService);
  private router = inject(Router);

  public availableAnimals = signal<AnimalDTO[]>([]);
  public animalMap = signal<Record<string, AnimalDTO>>({});
  public appointmentAnimalMap = signal<Record<string, string>>({}); // appointmentId -> animalId
  public searchTerm = signal('');
  public showNewAppointmentForm = signal(false);

  // Formulario de Nueva Cita (US027)
  public newReason = signal('');
  public newScheduledAt = signal('');
  public newAnimalId = signal('anm-047');

  public displayedColumns: string[] = ['fecha', 'hora', 'animal', 'motivo', 'veterinario', 'estado', 'accion'];

  public filteredAppointments = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.store.appointments().filter(apt =>
      apt.reason.toLowerCase().includes(term) ||
      apt.status.toLowerCase().includes(term)
    );
  });

  ngOnInit(): void {
    this.store.loadAppointments();

    // 1. Cargar lista de animales
    this.externalData.getAnimals().subscribe(animals => {
      this.availableAnimals.set(animals);
      const map: Record<string, AnimalDTO> = {};
      animals.forEach(animal => { map[animal.id] = animal; });
      this.animalMap.set(map);

      if (animals.length > 0) {
        this.newAnimalId.set(animals[0].id);
      }
    });

    // 2. Cargar relación cita-animal desde db.json
    this.loadAppointmentAnimals();
  }

  private loadAppointmentAnimals(): void {
    this.externalData.getAppointmentAnimals().subscribe(relations => {
      const map: Record<string, string> = {};
      relations.forEach(r => {
        map[r.appointmentId] = r.animalId;
      });
      this.appointmentAnimalMap.set(map);
    });
  }

  public toggleNewAppointmentModal(): void {
    this.showNewAppointmentForm.update(val => !val);
  }

  // Guardar cita y vincular el animal seleccionado en hatarium-db.json
  public saveNewAppointment(): void {
    if (!this.newReason() || !this.newScheduledAt()) {
      alert('Por favor ingrese el motivo y la fecha de la cita.');
      return;
    }

    const selectedAnimal = this.newAnimalId();
    const newApt = {
      rancherId: 'usr-002',
      veterinarianId: 'usr-003',
      requestedBy: 'usr-002',
      scheduledAt: this.newScheduledAt(),
      reason: this.newReason(),
      status: 'scheduled',
      createdAt: new Date().toISOString().split('T')[0]
    };

    // Usamos apiClient inyectado directamente (resuelve el error TS2341)
    this.apiClient.createAppointment(newApt).subscribe({
      next: (createdApt) => {
        this.externalData.createAppointmentAnimal(createdApt.id, selectedAnimal).subscribe(() => {
          this.appointmentAnimalMap.update(map => ({
            ...map,
            [createdApt.id]: selectedAnimal
          }));
          this.store.loadAppointments();
        });

        this.showNewAppointmentForm.set(false);
        this.newReason.set('');
        this.newScheduledAt.set('');
        alert('Nueva cita registrada exitosamente');
      }
    });
  }

  public goToDiagnosis(appointmentId: string): void {
    const animalId = this.appointmentAnimalMap()[appointmentId] || 'anm-047';
    this.router.navigate(['/veterinary/history'], {
      queryParams: { appointmentId, animalId }
    });
  }
}
