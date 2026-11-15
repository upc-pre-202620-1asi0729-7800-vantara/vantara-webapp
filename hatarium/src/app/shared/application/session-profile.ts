import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IamStore } from '../../iam/application/iam.store';
import { environment } from '../../../environments/environment';

interface UserRecord {
  /** IAM user id as text: the reference the backend expects as rancher/veterinarian id. */
  id: string;
  accountId: string;
  fullName: string;
  photoUrl: string;
}

/** Profile returned by `GET /profile-management/profiles/me`. */
interface ProfileResource {
  id: number;
  userId: number;
  fullName: string | null;
  organizationName: string | null;
  photoUrl: string | null;
}

/**
 * Resolves the identity of the signed-in account: the role comes from the IAM token
 * and the personal data from the Profile Management backend, so every screen shows
 * the same identity instead of a hardcoded one.
 */
@Injectable({ providedIn: 'root' })
export class SessionProfile {

  private static readonly ROLE_NAMES: Record<string, string> = {
    RANCHER: 'Ganadero',
    VETERINARIAN: 'Veterinario',
    FINAL_USER: 'Usuario final',
    ADMIN: 'Administrador'
  };

  private readonly http = inject(HttpClient);
  private readonly iamStore = inject(IamStore);
  private readonly profileUrl = `${environment.vantaraBackendBaseUrl}/profile-management/profiles/me`;

  /** Roles travel with the session, so there is nothing to wait for; kept for the guards. */
  readonly roleReady: Promise<void> = Promise.resolve();

  readonly user = signal<UserRecord | null>(null);

  /** Role code without the `ROLE_` prefix: RANCHER, VETERINARIAN or FINAL_USER. */
  readonly roleCode = computed(() => this.iamStore.currentAccount()?.roleCode ?? '');
  readonly isVeterinarian = computed(() => this.roleCode() === 'VETERINARIAN');
  readonly landingRoute = computed(() => this.isVeterinarian() ? '/veterinary/dashboard' : '/home');

  readonly fullName = computed(() => this.user()?.fullName || this.iamStore.currentAccount()?.email || '');
  readonly roleName = computed(() => SessionProfile.ROLE_NAMES[this.roleCode()] ?? '');
  readonly photoUrl = computed(() => this.user()?.photoUrl ?? '');

  /** Numeric IAM user id of the signed-in account (subject of the backend token). */
  readonly iamUserId = computed(() => this.iamStore.currentUserId());

  /** IAM user id as text, used as rancher/veterinarian reference by the other contexts. */
  readonly userId = computed(() => {
    const id = this.iamUserId();
    return id === null ? '' : String(id);
  });

  /** Refreshes the name and photo after the profile screen saves them. The id stays the IAM one. */
  updateUser(user: UserRecord): void {
    const current = this.user();
    if (!current || String(this.iamStore.currentAccount()?.id) !== String(user.accountId)) return;
    this.user.set({ ...current, fullName: user.fullName, photoUrl: user.photoUrl });
  }

  /** Up to two letters taken from the full name, used by the sidebar avatar. */
  readonly initials = computed(() => {
    const parts = this.fullName().trim().split(/\s+/).filter(Boolean);
    if (!parts.length) return '';
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
  });

  constructor() {
    effect(onCleanup => {
      const account = this.iamStore.currentAccount();
      if (!account) {
        this.user.set(null);
        return;
      }
      const id = String(account.id);
      this.user.set({ id, accountId: id, fullName: '', photoUrl: '' });

      const request = this.loadProfile(account.email).subscribe({
        next: profile => this.user.set({
          id, accountId: id, fullName: profile?.fullName ?? '', photoUrl: profile?.photoUrl ?? ''
        }),
        error: () => { /* keep the email as display name */ },
      });
      onCleanup(() => request.unsubscribe());
    });
  }

  /**
   * Reads the profile of the signed-in user. Right after the first sign-in it first saves
   * the name and organization typed at sign-up, because IAM does not store them.
   */
  private loadProfile(email: string): Observable<ProfileResource | null> {
    const pending = this.iamStore.takePendingProfile(email);
    if (pending) {
      return this.http.put<ProfileResource>(this.profileUrl, {
        fullName: pending.fullName,
        organizationName: pending.organizationName
      });
    }
    return this.http.get<ProfileResource>(this.profileUrl);
  }
}
