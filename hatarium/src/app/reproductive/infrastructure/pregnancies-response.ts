/**
 * Raw pregnancy resource returned by the Hatarium fake API.
 */
export interface PregnancyResource {
  id: string;
  animalId: string;
  calfId: string | null;
  confirmedOn: string;
  expectedCalvingOn: string | null;
  endedOn: string | null;
  outcome: string | null;
  birthWeightKg: string | null;
  dryOffOn: string | null;
  weanedOn: string | null;
  weaningWeightKg: string | null;
  status: string;
  notes: string | null;
}
