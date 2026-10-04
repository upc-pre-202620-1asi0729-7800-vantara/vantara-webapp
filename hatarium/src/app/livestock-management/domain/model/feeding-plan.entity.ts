export class FeedingPlan {
  constructor(
    public id: string,
    public lotId: string,
    public name: string,
    public startedAt: string,
    public endedAt: string,
    public objective: string | null,
    public status: string,
    public currentWeight: number | null,
    public objectiveWeight: number | null,
    public dayFrequency: string,
    public weeklyFrequency: string[],
    public schedules: string[]
  ) {
  }

  public isCurrent(on: string): boolean {
    return (
      this.startedAt <= on &&
      (this.endedAt === null || on <= this.endedAt)
    );
  }
}
