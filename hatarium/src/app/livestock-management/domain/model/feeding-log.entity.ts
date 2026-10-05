export class FeedingLog {
  id: string;
  planItemId: string;
  animalId: string | null;
  lotId: string;
  feedName: string;
  feedAt: string;
  quantity: number;
  unit: string;
  recordedBy: string;
  notes: string;

  constructor() {
    this.id = '';
    this.planItemId = '';
    this.animalId = null;
    this.lotId = '';
    this.feedName = '';
    this.feedAt = '';
    this.quantity = 0;
    this.unit = '';
    this.recordedBy = '';
    this.notes = '';
  }
}
