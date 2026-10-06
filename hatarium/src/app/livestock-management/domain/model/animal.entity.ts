import { isCalf } from '../../../shared/domain/model/animal-age';

export class Animal {
  id: string;
  rancherId: string;
  lotId: string;
  earTag: string;
  name: string;
  species: string;
  breed: string;
  sex: string;
  birthDate: string;
  motherId: string | null;
  fatherId: string | null;
  weight: number;
  status: string;
  registeredAt: string;
  photoUrl: string;
  weanedOn: string | null;

  isCalf(): boolean {
    return isCalf(this.birthDate);
  }

  constructor() {
    this.id = '';
    this.rancherId = '';
    this.lotId = '';
    this.earTag = '';
    this.name = '';
    this.species = '';
    this.breed = '';
    this.sex = '';
    this.birthDate = '';
    this.motherId = null;
    this.fatherId = null;
    this.weight = 0;
    this.status = '';
    this.registeredAt = '';
    this.photoUrl = '';
    this.weanedOn = null;
  }
}
