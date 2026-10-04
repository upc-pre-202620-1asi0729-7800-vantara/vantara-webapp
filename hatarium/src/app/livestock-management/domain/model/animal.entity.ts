export class Animal {
  constructor(
    public id: string,
    public rancherId: string,
    public lotId: string,
    public earTag: string,
    public name: string,
    public species: string,
    public breed: string,
    public sex: string,
    public birthDate: string,
    public motherId: string | null,
    public fatherId: string | null,
    public weight: number,
    public status: string,
    public registeredAt: string,
    public photoUrl: string
  ) {}
}

