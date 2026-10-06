/**
 * Raw response contract for the livestock animals endpoint.
 */
export interface AnimalsResponse {
  /** Collection of raw animal resources returned by the API. */
  animals: AnimalResource[];
}

/**
 * Raw animal resource returned by the livestock API.
 */
export interface AnimalResource {
  /** Animal identifier. */
  id: string;

  /** Rancher/user who owns the animal. */
  rancherId: string;

  /** Lot where the animal currently belongs. */
  lotId: string;

  /** Animal ear tag identifier. */
  earTag: string;

  /** Animal name. */
  name: string;

  /** Animal species. */
  species: string;

  /** Animal breed. */
  breed: string;

  /** Animal sex. */
  sex: string;

  /** Animal birth date. */
  birthDate: string;

  /** Mother animal identifier, if available. */
  motherId: string | null;

  /** Father animal identifier, if available. */
  fatherId: string | null;

  /** Current animal weight in kilograms. */
  weight: number;

  /** Current animal status. */
  status: string;

  /** Animal registration date. */
  registeredAt: string;

  /** Animal photo URL. */
  photoUrl: string;
  weanedOn?: string | null;
}
