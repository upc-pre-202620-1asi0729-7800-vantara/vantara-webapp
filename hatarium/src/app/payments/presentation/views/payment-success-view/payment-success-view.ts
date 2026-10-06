import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

/**
 * View shown after a successful payment.
 */
@Component({
  selector: 'app-payment-success-view',
  imports: [RouterLink, MatButtonModule, MatCardModule],
  templateUrl: './payment-success-view.html',
  styleUrl: './payment-success-view.css',
  changeDetection: ChangeDetectionStrategy.Eager
})
export class PaymentSuccessView {}
