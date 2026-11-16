import { signal } from '@angular/core';

export class ProfileStore {
  private readonly savingState = signal(false);
  private readonly errorState = signal<string | undefined>(undefined);

  get saving(): boolean { return this.savingState(); }
  get errorMessage(): string | undefined { return this.errorState(); }

  setSaving(value: boolean): void {
    this.savingState.set(value);
  }

  setError(message?: string): void {
    this.errorState.set(message);
  }
}
