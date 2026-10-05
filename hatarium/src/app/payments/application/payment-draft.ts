export interface PaymentDraft {
  rancherId: string;
  appointmentId?: string | null;
  concept: string;
  amount: string;
  currency: string;
}
