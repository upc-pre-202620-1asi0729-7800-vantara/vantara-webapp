import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

/**
 * View to add a payment method. Card data is simulated.
 */
@Component({
  selector: 'app-payment-method-view',
  imports: [ReactiveFormsModule, RouterLink, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './payment-method-view.html',
  styleUrl: './payment-method-view.css',
  changeDetection: ChangeDetectionStrategy.Eager
})
export class PaymentMethodView {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  form = this.fb.group({
    cardNumber: ['', Validators.required],
    cardHolder: ['', Validators.required],
    expiry: ['', Validators.required],
    cvv: ['', Validators.required]
  });

  /** Fills the form with random simulated card data. */
  generateRandomData(): void {
    const digits = Array.from({ length: 4 }, () => Math.floor(1000 + Math.random() * 9000)).join(' ');
    const expiryMonth = String(1 + Math.floor(Math.random() * 12)).padStart(2, '0');
    const expiryYear = String(28 + Math.floor(Math.random() * 6));
    this.form.setValue({
      cardNumber: digits,
      cardHolder: 'Juan Quispe',
      expiry: `${expiryMonth}/${expiryYear}`,
      cvv: String(100 + Math.floor(Math.random() * 900))
    });
  }

  /** Submits the method and moves to the confirmation view. */
  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.router.navigateByUrl('/config/payments/confirm');
  }
}
