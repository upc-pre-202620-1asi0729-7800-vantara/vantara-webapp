/**
 * Raw response contract for the livestock feeding plan items endpoint.
 */
export interface FeedingPlanItemsResponse {
  /** Collection of raw feeding plan item resources returned by the API. */
  feedingPlanItems: FeedingPlanItemResource[];
}

/**
 * Raw feeding plan item resource returned by the livestock API.
 */
export interface FeedingPlanItemResource {
  /** Feeding plan item identifier. */
  id: string;

  /** Feeding plan associated with the item. */
  feedingPlanId: string;

  /** Name of the feed or ingredient. */
  feedName: string;

  /** Daily quantity of feed as returned by the API. */
  dailyQuantity: string;

  /** Unit used for the quantity. */
  unit: string;
}
