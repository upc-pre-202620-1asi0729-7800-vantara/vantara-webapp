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
import { RegisterWeaning } from '../../../../application/register-weaning';

/**
 * Routed form to register a weaning event.
 */
@Component({
  selector: 'app-weaning-event-form',
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
  templateUrl: './weaning-event-form.html',
  styleUrl: './weaning-event-form.css',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class WeaningEventForm {
  private fb = inject(FormBuilder);
  private registerWeaning = inject(RegisterWeaning);
  private router = inject(Router);

  readonly animalSelection = reproductiveEventOptions('weaning');
  readonly saving = signal(false);
  readonly saveError = signal<string | null>(null);
  readonly today = new Date().toLocaleDateString('sv-SE');

  form = this.fb.group({
    pregnancyId: ['', Validators.required],
    weanedOn: ['', Validators.required],
    weaningWeightKg: [''],
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
      await this.registerWeaning.save(value.pregnancyId!, value.weanedOn!, value.weaningWeightKg || null);
      await this.router.navigateByUrl('/reproductive');
    } catch (error) {
      this.saveError.set(error instanceof Error && !(error as { status?: number }).status
        ? error.message : 'No se pudo guardar el destete. Comprueba el servidor y vuelve a intentar.');
    } finally {
      this.saving.set(false);
    }
  }
}
