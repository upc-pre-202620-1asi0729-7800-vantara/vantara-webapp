import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { CdkTrapFocus } from '@angular/cdk/a11y';
import { TranslatePipe } from '@ngx-translate/core';
import { reproductiveEventOptions } from '../../../../application/reproductive-event-options';
import { ReproductiveStore } from '../../../../application/reproductive.store';
import { ReproductiveApi } from '../../../../infrastructure/reproductive-api';
import { firstValueFrom } from 'rxjs';

/**
 * Routed form to register a dry-off event.
 */
@Component({
  selector: 'app-dry-off-event-form',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    TranslatePipe,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    CdkTrapFocus,
  ],
  templateUrl: './dry-off-event-form.html',
  styleUrl: './dry-off-event-form.css',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class DryOffEventForm {
  private fb = inject(FormBuilder);
  private store = inject(ReproductiveStore);
  private router = inject(Router);
  private api = inject(ReproductiveApi);

  readonly animalSelection = reproductiveEventOptions('dry-off');
  readonly saving = signal(false);
  readonly saveError = signal<string | null>(null);
  readonly today = new Date().toLocaleDateString('sv-SE');

  form = this.fb.group({
    pregnancyId: ['', Validators.required],
    dryOffOn: ['', Validators.required],
  });

  /** Submits the event and returns to the dashboard. */
  async submit(): Promise<void> {
    if (this.saving()) return;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const value = this.form.getRawValue();
    this.saving.set(true);
    this.saveError.set(null);
    try {
      const pregnancy = await firstValueFrom(this.api.getPregnancy(value.pregnancyId!));
      if (pregnancy.endedOn || pregnancy.dryOffOn) throw new Error('Esta preñez ya tiene un parto o un secado registrado.');
      if (value.dryOffOn! < pregnancy.confirmedOn || value.dryOffOn! > this.today) {
        throw new Error('El secado debe ser posterior a la confirmación y no puede estar en el futuro.');
      }
      await firstValueFrom(this.store.recordDryOff(value.pregnancyId!, value.dryOffOn!));
      await this.router.navigateByUrl('/reproductive');
    } catch (error) {
      this.saveError.set(error instanceof Error && !(error as { status?: number }).status
        ? error.message : 'No se pudo registrar el secado. Comprueba el servidor.');
    } finally {
      this.saving.set(false);
    }
  }
}
