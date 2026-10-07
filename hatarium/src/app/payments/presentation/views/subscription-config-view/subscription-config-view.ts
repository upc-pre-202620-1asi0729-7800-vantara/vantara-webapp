import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { PaymentStore } from '../../../application/payment.store';

/**
 * View that summarizes the subscription and recent payments with modern styling.
 */
@Component({
  selector: 'app-subscription-config-view',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './subscription-config-view.html',
  styleUrl: './subscription-config-view.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubscriptionConfigView implements OnInit {
  protected store = inject(PaymentStore);

  ngOnInit(): void {
    this.store.load();
  }

  getStatusClass(status: string): string {
    const s = (status || '').toLowerCase();
    if (s === 'paid' || s === 'pagado') return 'status-paid';
    if (s === 'pending' || s === 'pendiente') return 'status-pending';
    return 'status-cancelled';
  }

  getStatusLabel(status: string): string {
    const s = (status || '').toLowerCase();
    if (s === 'paid' || s === 'pagado') return '● Pagado';
    if (s === 'pending' || s === 'pendiente') return '● Pendiente';
    return '● Cancelado';
  }
}
