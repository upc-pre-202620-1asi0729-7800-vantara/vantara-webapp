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
 * Routed form to register a dry-off event.
 */
@Component({
  selector: 'app-dry-off-event-form',
  imports: [ReactiveFormsModule, RouterLink, TranslatePipe, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './dry-off-event-form.html',
  styleUrl: './dry-off-event-form.css',
  changeDetection: ChangeDetectionStrategy.Eager
})
export class DryOffEventForm {
  private fb = inject(FormBuilder);
  private store = inject(ReproductiveStore);
  private router = inject(Router);

  form = this.fb.group({
    pregnancyId: ['', Validators.required],
    dryOffOn: ['', Validators.required]
  });

  /** Submits the event and returns to the dashboard. */
  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const value = this.form.getRawValue();
    this.store.recordDryOff(value.pregnancyId!, value.dryOffOn!);
    this.router.navigateByUrl('/reproductive');
  }
}
