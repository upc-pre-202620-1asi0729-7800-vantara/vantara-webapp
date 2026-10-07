import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';
import { PaymentStore } from '../../../application/payment.store';

/**
 * View with the full history of payments.
 */
@Component({
  selector: 'app-payment-history-view',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    TranslatePipe
  ],
  templateUrl: './payment-history-view.html',
  styleUrl: './payment-history-view.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentHistoryView implements OnInit {
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
