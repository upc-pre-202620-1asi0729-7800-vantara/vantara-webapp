import {Component, OnInit, inject, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';
import {VeterinaryStore} from '../../../application/veterinary.store';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {AnimalDTO, ExternalDataService} from '../../../infrastructure/services/external-data';

@Component({
  selector: 'app-appointment-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    TranslatePipe
  ],
  templateUrl: './appointment-detail.html',
  styleUrl: './appointment-detail.css'
})
export class AppointmentDetailComponent implements OnInit {
  public store = inject(VeterinaryStore);
  private externalData = inject(ExternalDataService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  public appointmentId = signal<string>('app-001');
  public animalId = signal<string>('anm-047');
  public appointment = signal<any>(null);
  public animal = signal<AnimalDTO | null>(null);

  ngOnInit(): void {
    this.store.loadAppointments();

    this.route.params.subscribe(params => {
      const id = params['id'] || 'app-001';
      this.appointmentId.set(id);

      // Buscar cita en la lista cargada del Store
      const apt = this.store.appointments().find(a => a.id === id) || {
        id,
        scheduledAt: '2026-09-10T10:30:00',
        reason: 'Revisión general de estado y control de peso.',
        status: 'scheduled',
        veterinarianId: 'usr-003'
      };
      this.appointment.set(apt);

      // Cargar la relación Cita-Animal desde hatarium-db.json
      this.externalData.getAppointmentAnimals().subscribe(relations => {
        const rel = relations.find(r => r.appointmentId === id);
        const targetAnimalId = rel ? rel.animalId : 'anm-047';
        this.animalId.set(targetAnimalId);

        // Cargar detalle completo del animal seleccionado
        this.externalData.getAnimalDetail(targetAnimalId).subscribe(data => {
          this.animal.set(data);
        });
      });
    });
  }

  // Redirige al registro de diagnóstico pasando los IDs por queryParams
  public goToRegisterDiagnosis(): void {
    this.router.navigate(['/veterinary/history/new'], {
      queryParams: {
        appointmentId: this.appointmentId(),
        animalId: this.animalId()
      }
    });
  }
}
