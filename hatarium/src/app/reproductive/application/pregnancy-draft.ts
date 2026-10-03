/**
 * Input data required to confirm a new pregnancy.
 */
export interface PregnancyDraft {
  animalId: string;
  calfId?: string | null;
  confirmedOn: string;
  expectedCalvingOn?: string | null;
}
