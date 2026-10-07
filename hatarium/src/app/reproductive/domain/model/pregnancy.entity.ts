/**
 * Represents a pregnancy record in the Reproductive bounded context.
 */
export class Pregnancy {
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

  constructor() {
    this.id = '';
    this.animalId = '';
    this.calfId = null;
    this.confirmedOn = '';
    this.expectedCalvingOn = null;
    this.endedOn = null;
    this.outcome = null;
    this.birthWeightKg = null;
    this.dryOffOn = null;
    this.weanedOn = null;
    this.weaningWeightKg = null;
    this.status = '';
    this.notes = null;
  }

  /**
   * Returns whether the pregnancy has a registered calving result.
   */
  hasCalvingResult(): boolean {
    return this.outcome != null && this.outcome !== '';
  }
}
