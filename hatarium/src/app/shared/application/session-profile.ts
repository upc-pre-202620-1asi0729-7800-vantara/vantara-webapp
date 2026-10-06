import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  private readonly http = inject(HttpClient);
  private readonly iamStore = inject(IamStore);

  private readonly users = signal<UserRecord[]>([]);
  private readonly roles = signal<RoleRecord[]>([]);

  readonly user = signal<UserRecord | null>(null);
  readonly role = signal<RoleRecord | null>(null);

  readonly fullName = computed(() => this.user()?.fullName ?? this.iamStore.currentAccount()?.email ?? '');
  readonly roleName = computed(() => this.role()?.name ?? '');
  readonly photoUrl = computed(() => this.user()?.photoUrl ?? '');

  /** Up to two letters taken from the full name, used by the sidebar avatar. */
  readonly initials = computed(() => {
    const parts = this.fullName().trim().split(/\s+/).filter(Boolean);
    if (!parts.length) return '';
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
  });

  constructor() {
    const base = environment.hatariumApiBaseUrl;
    this.http.get<UserRecord[]>(`${base}/users`).subscribe(list => this.users.set(list));
    this.http.get<RoleRecord[]>(`${base}/roles`).subscribe(list => this.roles.set(list));

    effect(() => {
      const account = this.iamStore.currentAccount();
      const users = this.users();
      const roles = this.roles();

      this.user.set(account ? users.find(u => u.accountId === account.id) ?? null : null);
      this.role.set(account ? roles.find(r => r.id === account.roleId) ?? null : null);
    });
  }
}