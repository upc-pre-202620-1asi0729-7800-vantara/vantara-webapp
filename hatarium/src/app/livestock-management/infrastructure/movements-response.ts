/**
 * Raw response contract for the livestock movements endpoint.
 */
export interface MovementsResponse {
  /** Collection of raw movement resources returned by the API. */
  movements: MovementResource[];
}

/**
 * Raw movement resource returned by the livestock API.
 */
export interface MovementResource {
  /** Movement identifier. */
  id: string;
  animalId: string;
  originLotId: string | null;
  destinationLotId: string;
  movementType: string;
  occurredAt: string;
  reason: string;
  recordedBy: string;
}
