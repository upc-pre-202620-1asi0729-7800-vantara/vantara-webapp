import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CdkTrapFocus } from '@angular/cdk/a11y';
import { TranslatePipe } from '@ngx-translate/core';
import { reproductiveEventOptions } from '../../../../application/reproductive-event-options';
import { RegisterCalving } from '../../../../application/register-calving';

/**
 * Routed form to register a calving event.
 */
@Component({
  selector: 'app-calving-event-form',
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
    MatCheckboxModule,
    CdkTrapFocus,
  ],
  templateUrl: './calving-event-form.html',
  styleUrl: './calving-event-form.css',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class CalvingEventForm {
  private fb = inject(FormBuilder);
  private registerCalving = inject(RegisterCalving);
  private router = inject(Router);

  readonly animalSelection = reproductiveEventOptions('calving');
  readonly saving = signal(false);
  readonly saveError = signal<string | null>(null);
  readonly today = new Date().toLocaleDateString('sv-SE');

  form = this.fb.group({
    pregnancyId: ['', Validators.required],
    calvingOn: ['', Validators.required],
    outcome: ['', Validators.required],
    registerCalf: [true],
    calf: this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/\S/)]],
      earTag: ['', [Validators.required, Validators.pattern(/\S/)]],
      sex: ['Hembra', Validators.required],
      weight: [null as number | null, [Validators.required, Validators.min(0.01)]],
    }),
  });

  toggleCalf(enabled: boolean): void {
    if (enabled) this.form.controls.calf.enable();
    else this.form.controls.calf.disable();
  }

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
      await this.registerCalving.save({
        pregnancyId: value.pregnancyId!,
        on: value.calvingOn!,
        outcome: value.outcome!,
        calf: value.registerCalf ? {
          name: value.calf.name!, earTag: value.calf.earTag!,
          sex: value.calf.sex!, weight: value.calf.weight!,
        } : undefined,
      });
      await this.router.navigateByUrl('/reproductive');
    } catch (error) {
      this.saveError.set(error instanceof Error && !(error as { status?: number }).status
        ? error.message : 'No se pudo guardar el parto. Comprueba el servidor y vuelve a intentar.');
    } finally {
      this.saving.set(false);
    }
  }
}
