import { Component, DestroyRef, Input, OnChanges, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subscription } from 'rxjs';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { AnimalAppointment, VeterinaryApiClient } from '../../../../veterinary-and-health/infrastructure/veterinary-api-client';

@Component({
  selector: 'app-animal-appointments',
  imports: [MatIcon, MatButton, TranslatePipe],
  templateUrl: './animal-appointments.html',
  styleUrl: './animal-appointments.css',
})
export class AnimalAppointments implements OnChanges {
  @Input({ required: true }) animalId = '';
  private readonly api = inject(VeterinaryApiClient);
  private readonly destroyRef = inject(DestroyRef);
  private readonly translate = inject(TranslateService);
  private request?: Subscription;
  readonly appointments = signal<AnimalAppointment[]>([]);
  readonly loading = signal(false);
  readonly failed = signal(false);

  ngOnChanges(): void { this.load(); }

  load(): void {
    this.request?.unsubscribe();
    this.appointments.set([]);
    this.failed.set(false);
    if (!this.animalId) { this.loading.set(false); return; }
    this.loading.set(true);
    this.request = this.api.getAppointmentsByAnimal(this.animalId)
      .pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: appointments => { this.appointments.set(appointments); this.loading.set(false); },
        error: () => { this.failed.set(true); this.loading.set(false); },
      });
  }

  statusKey(status: string): string {
    const known = ['scheduled', 'completed', 'cancelled', 'canceled'];
    return 'animalAppointments.' + (known.includes(status) ? (status === 'canceled' ? 'cancelled' : status) : 'unknownStatus');
  }

  formatDate(value: string): string {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return this.translate.instant('animalAppointments.noDate');
    return new Intl.DateTimeFormat(this.translate.currentLang() === 'en' ? 'en-US' : 'es-PE', {
      day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit',
    }).format(date);
  }
}
