export class FeedingLog {
  constructor(
    public id: string,
    public planItemId: string,
    public lotId: string,
    public feedName: string,
    public fedAt: Date,
    public quantity: number,
    public unit: string,
    public recordedBy: string
  ) {}

  public formattedQuantity(): string {
    return `${this.quantity} ${this.unit}`;
  }
}
