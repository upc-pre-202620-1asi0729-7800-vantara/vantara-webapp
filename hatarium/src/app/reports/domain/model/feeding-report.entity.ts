export class FeedingReport {

  totalPlans: number;

  animalsWithPlan: number;

  totalRegisteredConsumption: number;

  totalFeedingRecords: number;

  consumptionUnits: string[];

  totalConsumptionByUnit: { unit: string; quantity: number }[];

  consumptionByFeed: {
    feedName: string;
    quantity: number;
    unit: string;
  }[];

  consumptionByLot: {
    lotId: string;
    lotName: string;
    planName: string;
    quantity: number;
    unit: string;
  }[];

  constructor() {

    this.totalPlans = 0;

    this.animalsWithPlan = 0;

    this.totalRegisteredConsumption = 0;

    this.totalFeedingRecords = 0;

    this.consumptionUnits = [];

    this.totalConsumptionByUnit = [];

    this.consumptionByFeed = [];

    this.consumptionByLot = [];
  }
}
