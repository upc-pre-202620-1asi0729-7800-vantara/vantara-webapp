import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { PaymentService } from '../../../application/payment.service';

/**
 * View to confirm the payment before processing it.
 */
@Component({
  selector: 'app-confirm-payment-view',
  imports: [RouterLink, MatButtonModule, MatCardModule],
  templateUrl: './confirm-payment-view.html',
  styleUrl: './confirm-payment-view.css',
  changeDetection: ChangeDetectionStrategy.Eager
})
export class ConfirmPaymentView {
  private service = inject(PaymentService);
  private router = inject(Router);

  readonly plan = { name: 'Profesional', price: '49.90', currency: 'PEN' };

  /** Confirms the payment and navigates to the success view. */
  pay(): void {
    this.service.create({
      rancherId: 'usr-002',
      concept: 'Suscripción mensual',
      amount: this.plan.price,
      currency: this.plan.currency
    });
    this.router.navigateByUrl('/config/payments/success');
  }
}
