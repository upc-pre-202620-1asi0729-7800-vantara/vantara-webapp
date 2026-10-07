export class ProfileDraft {
  fullName: string;
  organizationName = '';
  phone?: string;
  photoUrl?: string;
  theme: string;
  locale: string;

  constructor() {
    this.fullName = '';
    this.phone = '';
    this.photoUrl = '';
    this.theme = '';
    this.locale = '';
  }
}
