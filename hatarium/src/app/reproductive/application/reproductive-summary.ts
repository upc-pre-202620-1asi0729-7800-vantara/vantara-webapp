/**
 * Aggregated values displayed at the top of the reproductive dashboard.
 */
export interface ReproductiveSummary {
  reproductiveFemales: number;
  calfCount: number;
  reproductiveFemalePercentage: number;
  pregnantFemales: number;
  pregnantPercentage: number;
  upcomingCalvings: number;
  followUpRequired: number;
  statusDistribution: ReproductiveStatusDistribution;
  upcomingEvents: UpcomingReproductiveEvent[];
  recentEvents: RecentReproductiveEvent[];
}

/** Mutually exclusive reproductive states used by the dashboard chart. */
export interface ReproductiveStatusDistribution {
  pregnant: number;
  vacant: number;
  inHeat: number;
  issues: number;
}

/** Future reproductive event shown in the dashboard preview. */
export interface UpcomingReproductiveEvent {
  id: string;
  type: 'calving';
  animalLabel: string;
  animalBreed: string;
  scheduledOn: string;
}

export type ReproductiveEventType = 'pregnancy' | 'calving' | 'dryOff' | 'weaning';
export type ReproductiveEventStatus = 'confirmed' | 'completed' | 'registered';

/** Historical reproductive event rendered in the recent-events table. */
export interface RecentReproductiveEvent {
  id: string;
  type: ReproductiveEventType;
  animalLabel: string;
  animalBreed: string;
  occurredOn: string;
  status: ReproductiveEventStatus;
}

/** Initial dashboard summary used while the API request is in progress. */
export const EMPTY_REPRODUCTIVE_SUMMARY: ReproductiveSummary = {
  reproductiveFemales: 0,
  calfCount: 0,
  reproductiveFemalePercentage: 0,
  pregnantFemales: 0,
  pregnantPercentage: 0,
  upcomingCalvings: 0,
  followUpRequired: 0,
  statusDistribution: {
    pregnant: 0,
    vacant: 0,
    inHeat: 0,
    issues: 0,
  },
  upcomingEvents: [],
  recentEvents: [],
};
