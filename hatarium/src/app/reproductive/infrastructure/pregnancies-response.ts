/**
 * Raw reproductive record returned by the VANTARA backend.
 */
export interface PregnancyResource {
  id: number;
  animalId: string;
  calfId: string | null;
  confirmedOn: string;
  expectedCalvingOn: string | null;
  calvedOn: string | null;
  outcome: string | null;
  birthWeightKg: string | null;
  dryOffOn: string | null;
  weanedOn: string | null;
  weaningWeightKg: string | null;
  status: string;
}
