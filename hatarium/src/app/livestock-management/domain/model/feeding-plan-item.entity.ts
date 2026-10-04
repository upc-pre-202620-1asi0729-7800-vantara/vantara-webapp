export class FeedingPlanItem {
  constructor(
    public id: string,
    public feedingPlanId: string,
    public feedName: string,
    public dailyQuantity: number,
    public unit: string
  ) {}

  public formattedQuantity(): string {
    return `${this.dailyQuantity} ${this.unit}`;
  }
}
