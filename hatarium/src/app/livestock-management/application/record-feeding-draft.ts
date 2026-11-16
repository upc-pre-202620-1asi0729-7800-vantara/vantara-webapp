export interface RecordFeedingDraft {
  feedingPlanId: string;
  planItemId: string;
  animalId?: string | null;
  lotId: string;
  feedAt: string;
  quantity: number;
  recordedBy: string;
  notes?: string;
}
