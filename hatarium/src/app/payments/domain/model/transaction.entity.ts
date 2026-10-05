/**
 * Represents a transaction attempt in the Payments bounded context.
 */
export class Transaction {
  id: string;
  paymentId: string;
  provider: string;
  providerReference: string | null;
  status: string;
  attemptedAt: string;
  failureReason: string | null;

  constructor() {
    this.id = '';
    this.paymentId = '';
    this.provider = '';
    this.providerReference = null;
    this.status = '';
    this.attemptedAt = '';
    this.failureReason = null;
  }

  /**
   * Returns whether the transaction ended in failure.
   */
  hasFailure(): boolean {
    return this.failureReason != null && this.failureReason !== '';
  }
}
