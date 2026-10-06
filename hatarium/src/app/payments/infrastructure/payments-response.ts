export interface PaymentResource {
  id: string;
  rancherId: string;
  appointmentId: string | null;
  concept: string;
  amount: string;
  currency: string;
  status: string;
  createdAt: string;
  confirmedAt: string | null;
  cancelledAt: string | null;
}

export interface TransactionResource {
  id: string;
  paymentId: string;
  provider: string;
  providerReference: string | null;
  status: string;
  attemptedAt: string;
  failureReason: string | null;
}

export interface ReceiptResource {
  id: string;
  paymentId: string;
  receiptNumber: string;
  issuedAt: string;
  documentUrl: string;
}
