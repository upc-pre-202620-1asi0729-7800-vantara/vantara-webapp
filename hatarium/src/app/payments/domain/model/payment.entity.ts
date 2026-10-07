/**
 * Represents a payment in the Payments bounded context.
 */
export class Payment {
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

  constructor() {
    this.id = '';
    this.rancherId = '';
    this.appointmentId = null;
    this.concept = '';
    this.amount = '';
    this.currency = 'PEN';
    this.status = '';
    this.createdAt = '';
    this.confirmedAt = null;
    this.cancelledAt = null;
  }

  /**
   * Returns the amount formatted with its currency.
   */
  formattedAmount(): string {
    return `${this.currency} ${this.amount}`;
  }
}
