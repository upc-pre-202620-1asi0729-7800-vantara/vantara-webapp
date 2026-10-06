import { signal } from '@angular/core';
import { User } from '../domain/model/user.entity';

export class ProfileStore {
  private readonly profileState = signal<User | undefined>(undefined);
  private readonly loadingState = signal(false);
  private readonly savingState = signal(false);
  private readonly errorState = signal<string | undefined>(undefined);

  get profile(): User | undefined { return this.profileState(); }
  get loading(): boolean { return this.loadingState(); }
  get saving(): boolean { return this.savingState(); }
  get errorMessage(): string | undefined { return this.errorState(); }

  setProfile(profile: User): void {
    this.profileState.set(profile);
  }

  setLoading(value: boolean): void {
    this.loadingState.set(value);
  }

  setSaving(value: boolean): void {
    this.savingState.set(value);
  }

  setError(message?: string): void {
    this.errorState.set(message);
  }
}
