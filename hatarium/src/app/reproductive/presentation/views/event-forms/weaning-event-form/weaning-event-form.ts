import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { TranslatePipe } from '@ngx-translate/core';
import { ReproductiveStore } from '../../../../application/reproductive.store';

/**
 * Routed form to register a weaning event.
 */
@Component({
  selector: 'app-weaning-event-form',
  imports: [ReactiveFormsModule, RouterLink, TranslatePipe, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './weaning-event-form.html',
  styleUrl: './weaning-event-form.css',
  changeDetection: ChangeDetectionStrategy.Eager
})
export class WeaningEventForm {
  private fb = inject(FormBuilder);
  private store = inject(ReproductiveStore);
  private router = inject(Router);

  form = this.fb.group({
    pregnancyId: ['', Validators.required],
    weanedOn: ['', Validators.required],
    weaningWeightKg: ['']
  });

  /** Submits the event and returns to the dashboard. */
  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const value = this.form.getRawValue();
    this.store.recordWeaning(value.pregnancyId!, value.weanedOn!, value.weaningWeightKg || null);
    this.router.navigateByUrl('/reproductive');
  }
}
