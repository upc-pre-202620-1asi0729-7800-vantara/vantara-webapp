import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Payment } from '../domain/model/payment.entity';
import { Transaction } from '../domain/model/transaction.entity';
import { Receipt } from '../domain/model/receipt.entity';
import { PaymentResource, TransactionResource, ReceiptResource } from './payments-response';
import { PaymentAssembler } from './payment-assembler';
import { TransactionAssembler } from './transaction-assembler';
import { ReceiptAssembler } from './receipt-assembler';
import { PaymentDraft } from '../application/payment-draft';

/**
 * Infrastructure gateway to the Hatarium payments API.
 */
@Injectable({ providedIn: 'root' })
export class PaymentsApi {
  private baseUrl = environment.hatariumApiBaseUrl;
  private http = inject(HttpClient);
  private paymentAssembler = inject(PaymentAssembler);
  private transactionAssembler = inject(TransactionAssembler);
  private receiptAssembler = inject(ReceiptAssembler);

  /** Returns all payments. */
  getPayments(): Observable<Payment[]> {
    return this.http.get<PaymentResource[]>(`${this.baseUrl}/payments`).pipe(
      map(resources => this.paymentAssembler.toEntitiesFromResponse(resources))
    );
  }

  /** Returns a single payment by id. */
  getPayment(id: string): Observable<Payment> {
    return this.http.get<PaymentResource>(`${this.baseUrl}/payments/${id}`).pipe(
      map(resource => this.paymentAssembler.toEntityFromResource(resource))
    );
  }

  /** Returns transactions of a payment. */
  getTransactions(id: string): Observable<Transaction[]> {
    return this.http.get<TransactionResource[]>(`${this.baseUrl}/transactions`, {
      params: { paymentId: id }
    }).pipe(
      map(resources => this.transactionAssembler.toEntitiesFromResponse(resources))
    );
  }

  /** Returns the receipt of a payment, if any. */
  getReceipt(id: string): Observable<Receipt[]> {
    return this.http.get<ReceiptResource[]>(`${this.baseUrl}/receipts`, {
      params: { paymentId: id }
    }).pipe(
      map(resources => resources.map(r => this.receiptAssembler.toEntityFromResource(r)))
    );
  }

  /** Creates a payment from a draft. */
  create(draft: PaymentDraft): Observable<Payment> {
    const payload = {
      rancherId: draft.rancherId,
      appointmentId: draft.appointmentId ?? null,
      concept: draft.concept,
      amount: draft.amount,
      currency: draft.currency,
      status: 'paid',
      createdAt: new Date().toISOString().slice(0, 10),
      confirmedAt: new Date().toISOString().slice(0, 10),
      cancelledAt: null
    };
    return this.http.post<PaymentResource>(`${this.baseUrl}/payments`, payload).pipe(
      map(resource => this.paymentAssembler.toEntityFromResource(resource))
    );
  }
}
