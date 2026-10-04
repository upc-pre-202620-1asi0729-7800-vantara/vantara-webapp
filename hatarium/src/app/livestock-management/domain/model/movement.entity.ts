export class Movement {
  constructor(
    public id: string,
    public animalId: string,
    public originLotId: string | null,
    public destinationLotId: string | null,
    public movementType: string,
    public date: string,
    public reason: string | null
  ) {
  }
}
