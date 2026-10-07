export class Movement {
  id: string;
  animalId: string;
  originLotId: string | null;
  destinationLotId: string;
  movementType: string;
  occurredAt: string;
  reason: string;
  recordedBy: string;

  constructor() {
    this.id = '';
    this.animalId = '';
    this.originLotId = null;
    this.destinationLotId = '';
    this.movementType = '';
    this.occurredAt = '';
    this.reason = '';
    this.recordedBy = '';
  }
}
