export class FeedingPlan {
  id: string;
  lotId: string;
  animalId: string | null;
  name: string;
  startsOn: string;
  endsOn: string;
  objective: string;
  currentAverageWeight: number;
  targetWeight: number;
  frequency: string;
  daysOfWeek: string[];
  schedules: {
    time: string;
    quantityPerAnimal: number;
  }[];
  instructions: string;
  status: string;

  constructor() {
    this.id = '';
    this.lotId = '';
    this.animalId = null;
    this.name = '';
    this.startsOn = '';
    this.endsOn = '';
    this.objective = '';
    this.currentAverageWeight = 0;
    this.targetWeight = 0;
    this.frequency = '';
    this.daysOfWeek = [];
    this.schedules = [];
    this.instructions = '';
    this.status = '';
  }
}
