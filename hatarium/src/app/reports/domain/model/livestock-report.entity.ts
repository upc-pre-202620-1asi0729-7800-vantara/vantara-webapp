export class LivestockReport {
  totalAnimals: number;
  averageWeight: number;
  totalLots: number;
  males: number;
  females: number;

  animalsByLot: {
    lotId: string;
    lotName: string;
    animalCount: number;
    averageWeight: number;
    males: number;
    females: number;
  }[];

  animalsByBreed: {
    breed: string;
    count: number;
  }[];

  constructor() {
    this.totalAnimals = 0;
    this.averageWeight = 0;
    this.totalLots = 0;
    this.males = 0;
    this.females = 0;
    this.animalsByLot = [];
    this.animalsByBreed = [];
  }
}
