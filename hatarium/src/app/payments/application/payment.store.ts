import { Injectable, computed, inject, signal } from '@angular/core';
import { Payment } from '../domain/model/payment.entity';
import { Transaction } from '../domain/model/transaction.entity';
import { Receipt } from '../domain/model/receipt.entity';
import { PaymentsApi } from '../infrastructure/payments-api';

/**
 * Application store that coordinates payments state for presentation.
 */
@Injectable({ providedIn: 'root' })
export class PaymentStore {
  private paymentsSignal = signal<Payment[]>([]);
  private selectedPaymentSignal = signal<Payment | null>(null);
  private transactionsSignal = signal<Transaction[]>([]);
  private receiptSignal = signal<Receipt | null>(null);
  private loadingSignal = signal<boolean>(false);
  private errorMessageSignal = signal<string | null>(null);
  private paymentsApi = inject(PaymentsApi);

  readonly payments = computed(() => this.paymentsSignal());
  readonly lastPaidPayment = computed(() =>
    this.paymentsSignal().filter(p => p.status === 'paid').at(-1) ?? null
  );
  readonly currentPlanName = computed(() => {
    const last = this.lastPaidPayment();
    return last ? last.concept.replace('Suscripción ', '') : null;
  });
  readonly currentPlanAmount = computed(() => this.lastPaidPayment()?.formattedAmount() ?? null);
  readonly currentPlanSince = computed(() => this.lastPaidPayment()?.createdAt ?? null);
  readonly selectedPayment = computed(() => this.selectedPaymentSignal());
  readonly transactions = computed(() => this.transactionsSignal());
  readonly receipt = computed(() => this.receiptSignal());
  readonly loading = computed(() => this.loadingSignal());
  readonly errorMessage = computed(() => this.errorMessageSignal());

  /** Loads all payments. */
  load(): void {
    this.loadingSignal.set(true);
    this.errorMessageSignal.set(null);
    this.paymentsApi.getPayments().subscribe({
      next: payments => {
        this.paymentsSignal.set(payments);
        this.loadingSignal.set(false);
      },
      error: () => {
        this.errorMessageSignal.set('No se pudieron cargar los pagos.');
        this.loadingSignal.set(false);
      }
    });
  }

  /** Selects a payment and loads its transactions and receipt. */
  selectPayment(value: Payment): void {
    this.selectedPaymentSignal.set(value);
    this.paymentsApi.getTransactions(value.id).subscribe({
      next: transactions => this.transactionsSignal.set(transactions),
      error: () => this.errorMessageSignal.set('No se pudieron cargar las transacciones.')
    });
    this.paymentsApi.getReceipt(value.id).subscribe({
      next: receipts => this.receiptSignal.set(receipts.length > 0 ? receipts[0] : null),
      error: () => this.errorMessageSignal.set('No se pudo cargar el comprobante.')
    });
  }

  /** Creates a payment from a draft and prepends it to the local list. */
  create(draft: import('./payment-draft').PaymentDraft): void {
    this.paymentsApi.create(draft).subscribe({
      next: payment => this.paymentsSignal.update(list => [...list, payment]),
      error: () => this.errorMessageSignal.set('No se pudo crear el pago.')
    });
  }

  /** Refreshes the status of a payment. */
  refreshStatus(id: string): void {
    this.paymentsApi.getPayment(id).subscribe({
      next: payment => this.selectedPaymentSignal.set(payment),
      error: () => this.errorMessageSignal.set('No se pudo refrescar el estado.')
    });
  }
}
