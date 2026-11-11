import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { VeterinaryStore } from '../../../application/veterinary.store';
import {
  AnimalDTO,
  ExternalDataService,
  VeterinarianDTO
} from '../../../infrastructure/services/external-data';

type AppointmentTab = 'proximas' | 'historial';
type OriginFilter = 'ALL' | 'RANCHER_REQUEST' | 'TECHNICAL_VISIT';

@Component({
  selector: 'app-appointment-calendar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    TranslatePipe
  ],
  templateUrl: './appointment-calendar.html',
  styleUrl: './appointment-calendar.css'
})
export class AppointmentCalendarComponent implements OnInit {
  public store = inject(VeterinaryStore);
  private externalData = inject(ExternalDataService);
  private router = inject(Router);

  public animalMap = signal<Record<string, AnimalDTO>>({});
  public appointmentAnimalMap = signal<Record<string, string>>({});
  public veterinarianMap = signal<Record<string, VeterinarianDTO>>({});

  public activeTab = signal<AppointmentTab>('proximas');
  public originFilter = signal<OriginFilter>('ALL');
  public searchTerm = signal('');

  readonly scheduledCount = computed(() =>
    this.store.appointments().filter(appointment => appointment.status === 'scheduled').length
  );
  readonly rancherRequestCount = computed(() =>
    this.store.appointments().filter(appointment => appointment.origin === 'RANCHER_REQUEST').length
  );
  readonly technicalVisitCount = computed(() =>
    this.store.appointments().filter(appointment => appointment.origin === 'TECHNICAL_VISIT').length
  );

  /** Upcoming vs. history projection with search and origin filters applied. */
  public filteredAppointments = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const origin = this.originFilter();
    const showHistory = this.activeTab() === 'historial';

    return this.store.appointments()
      .filter(appointment => {
        const matchesTab = showHistory
          ? appointment.status !== 'scheduled' || new Date(appointment.scheduledAt).getTime() < Date.now()
          : appointment.status === 'scheduled' && new Date(appointment.scheduledAt).getTime() >= Date.now();
        const matchesSearch = !term
          || appointment.reason.toLowerCase().includes(term)
          || appointment.status.toLowerCase().includes(term);
        const matchesOrigin = origin === 'ALL' || appointment.origin === origin;
        return matchesTab && matchesSearch && matchesOrigin;
      })
      .sort((first, second) => {
        const firstDate = new Date(first.scheduledAt).getTime() || 0;
        const secondDate = new Date(second.scheduledAt).getTime() || 0;
        return showHistory ? secondDate - firstDate : firstDate - secondDate;
      });
  });

  ngOnInit(): void {
    this.store.loadAppointments();

    this.externalData.getAnimals().subscribe(animals => {
      const map: Record<string, AnimalDTO> = {};
      animals.forEach(animal => { map[animal.id] = animal; });
      this.animalMap.set(map);
    });

    this.externalData.getAppointmentAnimals().subscribe(relations => {
      const map: Record<string, string> = {};
      relations.forEach(relation => { map[relation.appointmentId] = relation.animalId; });
      this.appointmentAnimalMap.set(map);
    });

    this.externalData.getVeterinarians().subscribe(veterinarians => {
      const map: Record<string, VeterinarianDTO> = {};
      veterinarians.forEach(veterinarian => { map[veterinarian.id] = veterinarian; });
      this.veterinarianMap.set(map);
    });
  }

  public setTab(tab: AppointmentTab): void {
    this.activeTab.set(tab);
  }

  public setOriginFilter(filter: OriginFilter): void {
    this.originFilter.set(filter);
  }

  public goToNewAppointment(): void {
    void this.router.navigate(['/veterinary/appointments/new']);
  }

  public goToDetail(appointmentId: string): void {
    void this.router.navigate([`/veterinary/appointments/${appointmentId}`]);
  }

  public statusLabelKey(status: string): string {
    if (status === 'completed') return 'CALENDAR.STATUS_COMPLETED';
    if (status === 'cancelled') return 'CALENDAR.STATUS_CANCELLED';
    return 'CALENDAR.STATUS_SCHEDULED';
  }
}
