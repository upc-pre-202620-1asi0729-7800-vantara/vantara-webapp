import {computed, inject, Service, signal} from '@angular/core';
import {Account, AccountStatus} from '../domain/model/account.entity';
import {IamApi} from '../infrastructure/iam-api';
import {RegistrationRole} from '../domain/model/registration-role';

/** Holds the minimal IAM session state used by the mock API. */
@Service()
export class IamStore {
  private readonly iamApi = inject(IamApi);
  private readonly currentAccountSignal = signal<Account | null>(null);
  private readonly pendingAccountSignal = signal<Account | null>(null);
  private readonly loadingSignal = signal(false);
  private readonly errorSignal = signal<string | null>(null);

  readonly currentAccount = this.currentAccountSignal.asReadonly();
  readonly pendingAccount = this.pendingAccountSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();
  readonly isAuthenticated = computed(() => this.currentAccountSignal() !== null);

  registerAccount(email: string, password: string, role: RegistrationRole): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.iamApi.registerAccount(email, password, role).subscribe({
      next: account => {
        this.pendingAccountSignal.set(account);
        this.loadingSignal.set(false);
      },
      error: () => {
        this.pendingAccountSignal.set(null);
        this.handleAuthenticationError('No se pudo registrar la cuenta.');
      }
    });
  }

  verifyEmail(email: string, code: string): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.iamApi.verifyEmail(email, code).subscribe({
      next: account => {
        this.pendingAccountSignal.set(account);
        this.loadingSignal.set(false);
      },
      error: () => this.handleAuthenticationError('No se pudo verificar el correo.')
    });
  }

  /**
   * Starts a mock session by joining the account and profile collections.
   * Password validation must be added when the backend exposes a sign-in endpoint.
   */
  signIn(email: string): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.iamApi.getAccounts().subscribe({
      next: accounts => {
        const normalizedEmail = email.trim().toLowerCase();
        const account = accounts.find(item => item.email.toLowerCase() === normalizedEmail);

        if (!account || account.status !== AccountStatus.Active) {
          this.handleAuthenticationError('No existe una cuenta activa con ese correo.');
          return;
        }

        if (!account.emailVerified) {
          this.handleAuthenticationError('Debes verificar tu correo antes de iniciar sesión.');
          return;
        }

        this.currentAccountSignal.set(account);
        this.loadingSignal.set(false);
      },
      error: () => this.handleAuthenticationError('No se pudo consultar el servicio IAM.')
    });
  }

  signOut(): void {
    this.currentAccountSignal.set(null);
    this.errorSignal.set(null);
  }

  private handleAuthenticationError(message: string): void {
    this.currentAccountSignal.set(null);
    this.errorSignal.set(message);
    this.loadingSignal.set(false);
  }
}
