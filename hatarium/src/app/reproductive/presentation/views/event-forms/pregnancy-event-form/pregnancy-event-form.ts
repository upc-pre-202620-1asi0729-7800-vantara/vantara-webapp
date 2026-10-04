import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { ReproductiveStore } from '../../../../application/reproductive.store';

/**
 * Routed form to register a pregnancy confirmation event.
 */
@Component({
  selector: 'app-pregnancy-event-form',
  imports: [ReactiveFormsModule, RouterLink, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './pregnancy-event-form.html',
  styleUrl: './pregnancy-event-form.css',
  changeDetection: ChangeDetectionStrategy.Eager
})
export class PregnancyEventForm {
  private fb = inject(FormBuilder);
  private store = inject(ReproductiveStore);
  private router = inject(Router);

  form = this.fb.group({
    animalId: ['', Validators.required],
    calfId: [''],
    confirmedOn: ['', Validators.required],
    expectedCalvingOn: ['']
  });

  /** Submits the event and returns to the dashboard. */
  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const value = this.form.getRawValue();
    this.store.confirm({
      animalId: value.animalId!,
      calfId: value.calfId || null,
      confirmedOn: value.confirmedOn!,
      expectedCalvingOn: value.expectedCalvingOn || null
    });
    this.router.navigateByUrl('/reproductive');
  }
}
