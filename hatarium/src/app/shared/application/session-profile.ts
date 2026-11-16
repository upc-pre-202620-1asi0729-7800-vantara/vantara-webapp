import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, of, throwError } from 'rxjs';

import { IamStore } from '../../iam/application/iam.store';
import { environment } from '../../../environments/environment';
import { User } from '../../profile/domain/model/user.entity';

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
  phone?: string | null;
  theme?: string | null;
  locale?: string | null;
}

export type ProfileLoadStatus = 'signed-out' | 'loading' | 'ready' | 'missing' | 'error';

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

  /** Canonical profile data shared by the header and Profile Management view. */
  readonly profile = signal<User | null>(null);
  readonly profileStatus = signal<ProfileLoadStatus>('signed-out');
  private readonly retryVersion = signal(0);

  /** Role code without the `ROLE_` prefix: RANCHER, VETERINARIAN or FINAL_USER. */
  readonly roleCode = computed(() => this.iamStore.currentAccount()?.roleCode ?? '');
  readonly isVeterinarian = computed(() => this.roleCode() === 'VETERINARIAN');
  readonly landingRoute = computed(() => this.isVeterinarian() ? '/veterinary/dashboard' : '/home');

  /** Header identity is derived from the canonical profile instead of storing a second copy. */
  readonly user = computed<UserRecord | null>(() => {
    const account = this.iamStore.currentAccount();
    if (!account) return null;
    const profile = this.profile();
    const id = String(account.id);
    return {
      id,
      accountId: id,
      fullName: profile?.fullName ?? '',
      photoUrl: profile?.photoUrl ?? ''
    };
  });

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

  /** Publishes saved profile changes only while they still belong to the signed-in account. */
  updateProfile(profile: User): void {
    const account = this.iamStore.currentAccount();
    if (!account || String(account.id) !== String(profile.accountId)) return;
    this.profile.set(profile);
    this.profileStatus.set('ready');
  }

  /** Retries initial profile loading, including the pending first-save PUT when applicable. */
  retryProfileLoad(): void {
    this.retryVersion.update(value => value + 1);
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
      this.retryVersion();
      if (!account) {
        this.profile.set(null);
        this.profileStatus.set('signed-out');
        return;
      }
      const id = String(account.id);
      this.profile.set(null);
      this.profileStatus.set('loading');

      const pending = this.iamStore.getPendingProfile(account.email);
      const request = this.loadProfile(account.email, pending).subscribe({
        next: resource => {
          if (String(this.iamStore.currentAccount()?.id) !== id) return;
          if (!resource) {
            this.profile.set(null);
            this.profileStatus.set('missing');
            return;
          }
          const profile = this.toUser(resource, account.email);
          this.profile.set(profile);
          this.profileStatus.set('ready');
          if (pending) this.iamStore.clearPendingProfile(account.email);
        },
        error: () => {
          if (String(this.iamStore.currentAccount()?.id) === id) this.profileStatus.set('error');
        },
      });
      onCleanup(() => request.unsubscribe());
    });
  }

  /**
   * Reads the profile of the signed-in user. Right after the first sign-in it first saves
   * the name and organization typed at sign-up, because IAM does not store them.
   */
  private loadProfile(email: string, pending: ReturnType<IamStore['getPendingProfile']>): Observable<ProfileResource | null> {
    if (pending) {
      return this.http.put<ProfileResource>(this.profileUrl, {
        fullName: pending.fullName,
        organizationName: pending.organizationName
      });
    }
    return this.http.get<ProfileResource>(this.profileUrl).pipe(
      catchError((error: unknown) => error instanceof HttpErrorResponse && error.status === 404
        ? of(null)
        : throwError(() => error))
    );
  }

  private toUser(resource: ProfileResource, email: string): User {
    const user = new User();
    user.id = String(resource.id);
    user.accountId = String(resource.userId);
    user.email = email;
    user.fullName = resource.fullName ?? '';
    user.organizationName = resource.organizationName ?? '';
    user.photoUrl = resource.photoUrl ?? '';
    user.phone = resource.phone ?? '';
    user.theme = resource.theme ?? 'light';
    user.locale = resource.locale ?? 'es';
    return user;
  }
}
