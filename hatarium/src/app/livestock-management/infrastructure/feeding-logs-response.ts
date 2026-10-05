/**
 * Raw response contract for the livestock feeding logs endpoint.
 */
export interface FeedingLogsResponse {
  /** Collection of raw feeding log resources returned by the API. */
  feedingLogs: FeedingLogResource[];
}

/**
 * Raw feeding log resource returned by the livestock API.
 */
export interface FeedingLogResource {
  /** Feeding log identifier. */
  id: string;

  /** Feeding plan item associated with the log. */
  planItemId: string;

  /** Individual animal that received the feed. */
  animalId: string;

  /** Lot that received the feed. */
  lotId: string;

  /** Name of the feed administered. */
  feedName: string;

  /** Date when the feed was administered. */
  feedAt: string;

  /** Quantity administered as returned by the API. */
  quantity: string;

  /** Unit used for the quantity. */
  unit: string;

  /** User who recorded the feeding. */
  recordedBy: string;

  /** Additional notes about the feeding. */
  notes: string;
}
