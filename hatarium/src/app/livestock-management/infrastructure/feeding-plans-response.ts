/**
 * Raw response contract for the livestock feeding plans endpoint.
 */
export interface FeedingPlansResponse {
  /** Collection of raw feeding plan resources returned by the API. */
  feedingPlans: FeedingPlanResource[];
}

/**
 * Raw feeding plan resource returned by the livestock API.
 */
export interface FeedingPlanResource {
  /** Feeding plan identifier. */
  id: string;

  /** Lot associated with the feeding plan. */
  lotId: string;

  /** Individual animal associated with the feeding plan, when applicable. */
  animalId: string | null;

  /** Feeding plan name. */
  name: string;

  /** Start date of the feeding plan. */
  startsOn: string;

  /** End date of the feeding plan. */
  endsOn: string;

  /** Feeding plan objective. */
  objective: string;

  /** Current average weight of the animals. */
  currentAverageWeight: number;

  /** Target weight of the animals. */
  targetWeight: number;

  /** Feeding frequency. */
  frequency: string;

  /** Days on which feeding is scheduled. */
  daysOfWeek: string[];

  /** Scheduled feeding times. */
  schedules: {
    time: string;
    quantityPerAnimal: number;
  }[];

  /** Instructions for the feeding plan. */
  instructions: string;

  /** Current status of the feeding plan. */
  status: string;
}
