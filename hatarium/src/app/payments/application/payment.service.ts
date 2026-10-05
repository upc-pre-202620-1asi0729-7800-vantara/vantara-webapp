import { Injectable, inject } from '@angular/core';
import { Payment } from '../domain/model/payment.entity';
import { PaymentStore } from './payment.store';
import { PaymentDraft } from './payment-draft';

/**
 * Application service that coordinates the payment workflow.
 */
@Injectable({ providedIn: 'root' })
export class PaymentService {
  private store = inject(PaymentStore);

  /** Loads payments through the store. */
  load(): void {
    this.store.load();
  }

  /** Selects a payment and its related resources. */
  selectPayment(payment: Payment): void {
    this.store.selectPayment(payment);
  }

  /** Creates a payment from a draft. */
  create(draft: PaymentDraft): void {
    this.store.create(draft);
  }

  /** Refreshes the status of a payment. */
  refreshStatus(id: string): void {
    this.store.refreshStatus(id);
  }
}
