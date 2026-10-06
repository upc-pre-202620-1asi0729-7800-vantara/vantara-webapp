import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReproductiveStore } from '../../../application/reproductive.store';

/**
 * Presentation component with the form to confirm a pregnancy.
 */
@Component({
  selector: 'app-pregnancy-form',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './pregnancy-form.html',
  styleUrl: './pregnancy-form.css',
  changeDetection: ChangeDetectionStrategy.Eager
})
export class PregnancyForm implements OnInit {
  private fb = inject(FormBuilder);
  private store = inject(ReproductiveStore);

  form = this.fb.group({
    animalId: ['', Validators.required],
    calfId: [''],
    confirmedOn: ['', Validators.required],
    expectedCalvingOn: ['']
  });

  ngOnInit(): void {}

  /**
   * Submits the draft to confirm a pregnancy.
   */
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
    this.form.reset();
  }
}
