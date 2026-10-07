export class User {
  id: string;
  accountId: string;
  fullName: string;
  organizationName = '';
  email = '';
  phone?: string;
  photoUrl?: string;
  theme: string;
  locale: string;

  constructor() {
    this.id = '';
    this.accountId = '';
    this.fullName = '';
    this.phone = '';
    this.photoUrl = '';
    this.theme = '';
    this.locale = '';
  }

  displayName(): string {
    return this.fullName;
  }

  hasPhoto(): boolean {
    return !!this.photoUrl;
  }
}
