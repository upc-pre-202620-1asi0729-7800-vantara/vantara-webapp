import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { ReproductiveStore } from '../../../../application/reproductive.store';

/**
 * Routed form to register a calving event.
 */
@Component({
  selector: 'app-calving-event-form',
  imports: [ReactiveFormsModule, RouterLink, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './calving-event-form.html',
  styleUrl: './calving-event-form.css',
  changeDetection: ChangeDetectionStrategy.Eager
})
export class CalvingEventForm {
  private fb = inject(FormBuilder);
  private store = inject(ReproductiveStore);
  private router = inject(Router);

  form = this.fb.group({
    pregnancyId: ['', Validators.required],
    calvingOn: ['', Validators.required],
    outcome: ['', Validators.required]
  });

  /** Submits the event and returns to the dashboard. */
  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const value = this.form.getRawValue();
    this.store.recordCalving(value.pregnancyId!, value.calvingOn!, value.outcome!);
    this.router.navigateByUrl('/reproductive');
  }
}
