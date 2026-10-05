/**
 * Represents a receipt in the Payments bounded context.
 */
export class Receipt {
  id: string;
  paymentId: string;
  receiptNumber: string;
  issuedAt: string;
  documentUrl: string;

  constructor() {
    this.id = '';
    this.paymentId = '';
    this.receiptNumber = '';
    this.issuedAt = '';
    this.documentUrl = '';
  }

  /**
   * Returns whether the receipt has a downloadable document.
   */
  hasDocument(): boolean {
    return this.documentUrl != null && this.documentUrl !== '';
  }
}
