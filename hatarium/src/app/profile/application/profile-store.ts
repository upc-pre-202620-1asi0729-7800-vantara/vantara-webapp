import { User } from '../domain/model/user.entity';

export class ProfileStore {
  profile?: User;
  loading: boolean;
  errorMessage?: string;

  constructor() {
    this.profile = undefined;
    this.loading = false;
    this.errorMessage = undefined;
  }

  setProfile(profile: User): void {
    this.profile = profile;
  }

  setLoading(value: boolean): void {
    this.loading = value;
  }

  setError(message?: string): void {
    this.errorMessage = message;
  }
}
