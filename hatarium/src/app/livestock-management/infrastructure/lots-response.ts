/**
 * Raw response contract for the livestock lots endpoint.
 */
export interface LotsResponse {
  /** Collection of raw lot resources returned by the API. */
  lots: LotResource[];
}

/**
 * Raw lot resource returned by the livestock API.
 */
export interface LotResource {
  /** Lot identifier. */
  id: string;

  /** Rancher/user who owns the lot. */
  rancherId: string;

  /** Lot name. */
  name: string;

  /** Lot purpose. */
  purpose: string;

  /** Lot status. */
  status: string;
}
