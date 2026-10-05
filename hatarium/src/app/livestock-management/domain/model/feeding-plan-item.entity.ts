export class FeedingPlanItem {
  id: string;
  feedingPlanId: string;
  feedName: string;
  dailyQuantity: number;
  unit: string;

  constructor() {
    this.id = '';
    this.feedingPlanId = '';
    this.feedName = '';
    this.dailyQuantity = 0;
    this.unit = '';
  }
}
