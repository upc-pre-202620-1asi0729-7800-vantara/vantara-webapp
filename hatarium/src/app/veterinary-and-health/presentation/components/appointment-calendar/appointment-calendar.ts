import {Component, OnInit, inject, signal, computed} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterLink, Router} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {VeterinaryStore} from '../../../application/veterinary.store';
import {AnimalDTO, ExternalDataService} from '../../../infrastructure/services/external-data';

@Component({
  selector: 'app-appointment-calendar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
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

  public availableAnimals = signal<AnimalDTO[]>([]);
  public animalMap = signal<Record<string, AnimalDTO>>({});
  public appointmentAnimalMap = signal<Record<string, string>>({});

  // Filtros de navegación
  public activeTab = signal<'proximas' | 'historial'>('proximas');
  public originFilter = signal<'ALL' | 'RANCHER_REQUEST' | 'TECHNICAL_VISIT'>('ALL');
  public searchTerm = signal('');

  // Proyección computada con filtro por Origen y Buscador
  public filteredAppointments = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const origin = this.originFilter();

    return this.store.appointments().filter(apt => {
      const matchesSearch = apt.reason.toLowerCase().includes(term) || apt.status.toLowerCase().includes(term);
      const matchesOrigin = origin === 'ALL' || apt.origin === origin;
      return matchesSearch && matchesOrigin;
    });
  });

  ngOnInit(): void {
    this.store.loadAppointments();

    this.externalData.getAnimals().subscribe(animals => {
      this.availableAnimals.set(animals);
      const map: Record<string, AnimalDTO> = {};
      animals.forEach(a => { map[a.id] = a; });
      this.animalMap.set(map);
    });

    this.externalData.getAppointmentAnimals().subscribe(relations => {
      const map: Record<string, string> = {};
      relations.forEach(r => { map[r.appointmentId] = r.animalId; });
      this.appointmentAnimalMap.set(map);
    });
  }

  public setTab(tab: 'proximas' | 'historial'): void {
    this.activeTab.set(tab);
  }

  public setOriginFilter(filter: 'ALL' | 'RANCHER_REQUEST' | 'TECHNICAL_VISIT'): void {
    this.originFilter.set(filter);
  }

  public goToNewAppointment(): void {
    this.router.navigate(['/veterinary/appointments/new']);
  }

  public goToDetail(appointmentId: string): void {
    this.router.navigate([`/veterinary/appointments/${appointmentId}`]);
  }
}
