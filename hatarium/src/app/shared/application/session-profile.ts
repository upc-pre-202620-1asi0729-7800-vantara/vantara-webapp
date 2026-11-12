import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

import { IamStore } from '../../iam/application/iam.store';
import { environment } from '../../../environments/environment';

interface UserRecord {
  id: string;
  accountId: string;
  fullName: string;
  photoUrl: string;
}

interface RoleRecord {
  id: string;
  code: string;
  name: string;
}

/**
 * Resolves the personal data of the signed-in account from the shared json-server
 * collections, so every screen shows the same identity instead of a hardcoded one.
 */
@Injectable({ providedIn: 'root' })
export class SessionProfile {

  private static readonly FALLBACK_ROLE_CODES: Record<string, string> = {
    'role-001': 'ADMIN',
    'role-002': 'RANCHER',
    'role-003': 'VETERINARIAN'
  };

  private readonly http = inject(HttpClient);
  private readonly iamStore = inject(IamStore);

  private readonly roles = signal<RoleRecord[]>([]);

  /** Resolves once the role catalogue has been fetched (or failed gracefully). */
  readonly roleReady: Promise<void>;

  readonly user = signal<UserRecord | null>(null);
  readonly role = computed(() => this.roles().find(role => role.id === this.iamStore.currentAccount()?.roleId) ?? null);

  readonly roleCode = computed(() =>
    this.role()?.code
    ?? SessionProfile.FALLBACK_ROLE_CODES[this.iamStore.currentAccount()?.roleId ?? '']
    ?? ''
  );
  readonly isVeterinarian = computed(() => this.roleCode() === 'VETERINARIAN');
  readonly landingRoute = computed(() => this.isVeterinarian() ? '/veterinary/dashboard' : '/home');

  readonly fullName = computed(() => this.user()?.fullName ?? this.iamStore.currentAccount()?.email ?? '');
  readonly roleName = computed(() => this.role()?.name ?? '');
  readonly photoUrl = computed(() => this.user()?.photoUrl ?? '');

  /** Profile identifier of the signed-in user (used as rancher/veterinarian reference). */
  readonly userId = computed(() => this.user()?.id ?? '');

  updateUser(user: UserRecord): void {
    if (this.iamStore.currentAccount()?.id === user.accountId) this.user.set(user);
  }

  /** Up to two letters taken from the full name, used by the sidebar avatar. */
  readonly initials = computed(() => {
    const parts = this.fullName().trim().split(/\s+/).filter(Boolean);
    if (!parts.length) return '';
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
  });

  constructor() {
    const base = environment.hatariumApiBaseUrl;
    this.roleReady = firstValueFrom(this.http.get<RoleRecord[]>(`${base}/roles`))
      .then(list => this.roles.set(list))
      .catch(() => this.roles.set([]));

    effect(onCleanup => {
      const account = this.iamStore.currentAccount();
      this.user.set(null);
      if (!account) return;
      const request = this.http.get<UserRecord[]>(`${base}/users`, { params: { accountId: account.id } }).subscribe({
        next: users => this.user.set(users[0] ?? null),
        error: () => this.user.set(null),
      });
      onCleanup(() => request.unsubscribe());
    });
  }
}
