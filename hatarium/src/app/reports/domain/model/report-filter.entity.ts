export class ReportFilter {
  startsOn: string;
  endsOn: string;
  lotId: string | null;
  breed: string | null;
  sex: string | null;
  status: string | null;

  constructor() {
    this.startsOn = '';
    this.endsOn = '';
    this.lotId = null;
    this.breed = null;
    this.sex = null;
    this.status = null;
  }
}
