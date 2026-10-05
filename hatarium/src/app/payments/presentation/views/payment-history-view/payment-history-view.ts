import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { PaymentStore } from '../../../application/payment.store';

/**
 * View with the full history of payments.
 */
@Component({
  selector: 'app-payment-history-view',
  imports: [RouterLink, MatCardModule, MatListModule],
  templateUrl: './payment-history-view.html',
  styleUrl: './payment-history-view.css',
  changeDetection: ChangeDetectionStrategy.Eager
})
export class PaymentHistoryView implements OnInit {
  protected store = inject(PaymentStore);

  ngOnInit(): void {
    this.store.load();
  }
}
