import {computed, inject, Service, signal} from '@angular/core';
import {Account, AccountStatus} from '../domain/model/account.entity';
import {IamApi} from '../infrastructure/iam-api';
import {IamApiError} from '../infrastructure/iam-api-endpoint';
import {RegistrationRole} from '../domain/model/registration-role';
import {AUTH_TOKEN_STORAGE_KEY} from '../../shared/infrastructure/auth-token.interceptor';

/** Session storage key with the signed-in account (`{ id, email, roles }`). */
export const SESSION_STORAGE_KEY = 'hatarium.session';
/** Session storage key with the profile data typed at sign-up, applied after the first sign-in. */
const PENDING_PROFILE_STORAGE_KEY = 'hatarium.pendingProfile';

/** Profile data collected at sign-up. IAM does not store it; Profile Management does. */
export interface PendingProfile {
  email: string;
  fullName: string;
  organizationName: string;
}

interface StoredSession {
  id: number;
  email: string;
  roles: string[];
}

/** Holds the IAM session backed by the real backend and its JWT. */
@Service()
export class IamStore {
  private readonly iamApi = inject(IamApi);
  private readonly currentAccountSignal = signal<Account | null>(null);
  private readonly pendingAccountSignal = signal<Account | null>(null);
  private readonly loadingSignal = signal(false);
  private readonly errorSignal = signal<string | null>(null);
  private readonly infoSignal = signal<string | null>(null);

  readonly currentAccount = this.currentAccountSignal.asReadonly();
  readonly pendingAccount = this.pendingAccountSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();
  readonly info = this.infoSignal.asReadonly();
  readonly isAuthenticated = computed(() => this.currentAccountSignal() !== null);
  /** Numeric IAM user id of the signed-in account. */
  readonly currentUserId = computed(() => this.currentAccountSignal()?.id ?? null);
  /** Kept as a promise so guards keep awaiting it; the session is restored without network calls. */
  readonly ready: Promise<void>;

  constructor() {
    this.restoreSession();
    this.ready = Promise.resolve();
  }

  registerAccount(email: string, password: string, role: RegistrationRole, fullName: string, organizationName: string): void {
    this.startRequest();

    this.iamApi.signUp(email, password, role).subscribe({
      next: account => {
        writeStorage(PENDING_PROFILE_STORAGE_KEY, JSON.stringify({email: account.email, fullName, organizationName}));
        this.pendingAccountSignal.set(account);
        this.loadingSignal.set(false);
      },
      error: error => {
        this.pendingAccountSignal.set(null);
        this.fail(error, 'No se pudo registrar la cuenta.', {
          409: 'Ya existe una cuenta con ese correo.'
        });
      }
    });
  }

  verifyEmail(email: string, code: string): void {
    this.startRequest();

    this.iamApi.verifyEmail(email, code).subscribe({
      next: account => {
        this.pendingAccountSignal.set(account);
        this.loadingSignal.set(false);
      },
      error: error => this.fail(error, 'No se pudo verificar el correo.', {
        400: 'El código no es correcto.',
        404: 'No existe una cuenta con ese correo.',
        422: 'El código expiró, ya se usó o superaste los intentos. Solicita uno nuevo.'
      })
    });
  }

  resendVerificationCode(email: string): void {
    this.startRequest();

    this.iamApi.sendVerificationCode(email).subscribe({
      next: () => {
        this.infoSignal.set('Te enviamos un nuevo código de verificación.');
        this.loadingSignal.set(false);
      },
      error: error => this.fail(error, 'No se pudo reenviar el código.', {
        422: 'La cuenta ya está verificada o debes esperar un minuto antes de pedir otro código.'
      })
    });
  }

  signIn(email: string, password: string): void {
    this.startRequest();

    this.iamApi.signIn(email, password).subscribe({
      next: ({account, token}) => {
        writeStorage(AUTH_TOKEN_STORAGE_KEY, token);
        writeStorage(SESSION_STORAGE_KEY, JSON.stringify({id: account.id, email: account.email, roles: account.roles}));
        this.currentAccountSignal.set(account);
        this.loadingSignal.set(false);
      },
      error: error => {
        this.clearSession();
        this.fail(error, 'No se pudo iniciar sesión.', {
          401: 'El correo o la contraseña no son correctos.',
          422: 'Debes verificar tu correo antes de iniciar sesión.'
        });
      }
    });
  }

  signOut(): void {
    this.clearSession();
    this.errorSignal.set(null);
    this.infoSignal.set(null);
  }

  /** Reads the profile data typed at sign-up without consuming it. */
  getPendingProfile(email: string): PendingProfile | null {
    const raw = readStorage(PENDING_PROFILE_STORAGE_KEY);
    if (!raw) return null;
    try {
      const pending = JSON.parse(raw) as PendingProfile;
      return pending.email?.toLowerCase() === email.toLowerCase() ? pending : null;
    } catch {
      removeStorage(PENDING_PROFILE_STORAGE_KEY);
      return null;
    }
  }

  /** Clears sign-up profile data only after Profile Management confirms it was saved. */
  clearPendingProfile(email: string): void {
    const pending = this.getPendingProfile(email);
    if (pending) removeStorage(PENDING_PROFILE_STORAGE_KEY);
  }

  private restoreSession(): void {
    const token = readStorage(AUTH_TOKEN_STORAGE_KEY);
    const raw = readStorage(SESSION_STORAGE_KEY);
    if (!token || !raw || isTokenExpired(token)) {
      this.clearSession();
      return;
    }
    try {
      const stored = JSON.parse(raw) as StoredSession;
      if (typeof stored.id !== 'number' || !stored.email) throw new Error('Invalid session');
      this.currentAccountSignal.set(new Account({
        id: stored.id, email: stored.email, status: AccountStatus.Active, roles: stored.roles ?? []
      }));
    } catch {
      this.clearSession();
    }
  }

  private clearSession(): void {
    removeStorage(AUTH_TOKEN_STORAGE_KEY);
    removeStorage(SESSION_STORAGE_KEY);
    this.currentAccountSignal.set(null);
  }

  private startRequest(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.infoSignal.set(null);
  }

  private fail(error: unknown, fallback: string, byStatus: Record<number, string>): void {
    let message = fallback;
    if (error instanceof IamApiError) {
      if (error.status === 0) message = 'No se pudo conectar con el servidor.';
      else message = byStatus[error.status] ?? (error.status === 400 && error.message ? error.message : fallback);
    }
    this.errorSignal.set(message);
    this.loadingSignal.set(false);
  }
}

/** True when the JWT `exp` claim is in the past or the token cannot be read. */
function isTokenExpired(token: string): boolean {
  try {
    const payload = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    const claims = JSON.parse(atob(payload.padEnd(Math.ceil(payload.length / 4) * 4, '='))) as {exp?: number};
    return typeof claims.exp === 'number' && claims.exp * 1000 <= Date.now();
  } catch {
    return true;
  }
}

function readStorage(key: string): string | null {
  try { return sessionStorage.getItem(key); } catch { return null; }
}

function writeStorage(key: string, value: string): void {
  try { sessionStorage.setItem(key, value); } catch { /* storage unavailable: session lasts until reload */ }
}

function removeStorage(key: string): void {
  try { sessionStorage.removeItem(key); } catch { /* storage unavailable */ }
}
