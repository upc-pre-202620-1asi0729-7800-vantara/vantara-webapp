export interface PaymentDraft {
  appointmentId?: string | null;
  concept: string;
  amount: string;
  currency: string;
  paymentMethod?: string | null;
}
