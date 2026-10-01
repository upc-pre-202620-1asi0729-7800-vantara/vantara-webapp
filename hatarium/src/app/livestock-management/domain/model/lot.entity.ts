export class Lot {
  constructor(
    public id: string,
    public rancherId: string,
    public name: string,
    public purpose: string | null
  ) {}
}
