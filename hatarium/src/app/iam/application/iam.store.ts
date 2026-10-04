import {computed, inject, Service, signal} from '@angular/core';
import {forkJoin} from 'rxjs';
import {Account, AccountStatus} from '../domain/model/account.entity';
import {User} from '../domain/model/user.entity';
import {IamApi} from '../infrastructure/iam-api';

/** Holds the minimal IAM session state used by the mock API. */
@Service()
export class IamStore {
  private readonly iamApi = inject(IamApi);
  private readonly currentAccountSignal = signal<Account | null>(null);
  private readonly currentUserSignal = signal<User | null>(null);
  private readonly loadingSignal = signal(false);
  private readonly errorSignal = signal<string | null>(null);

  readonly currentAccount = this.currentAccountSignal.asReadonly();
  readonly currentUser = this.currentUserSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();
  readonly isAuthenticated = computed(() => this.currentAccountSignal() !== null);

  /**
   * Starts a mock session by joining the account and profile collections.
   * Password validation must be added when the backend exposes a sign-in endpoint.
   */
  signIn(email: string): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    forkJoin({
      accounts: this.iamApi.getAccounts(),
      users: this.iamApi.getUsers()
    }).subscribe({
      next: ({accounts, users}) => {
        const normalizedEmail = email.trim().toLowerCase();
        const account = accounts.find(item => item.email.toLowerCase() === normalizedEmail);

        if (!account || account.status !== AccountStatus.Active) {
          this.handleAuthenticationError('No existe una cuenta activa con ese correo.');
          return;
        }

        const user = users.find(item => item.accountId === account.id) ?? null;
        if (!user) {
          this.handleAuthenticationError('La cuenta no tiene un perfil de usuario asociado.');
          return;
        }

        this.currentAccountSignal.set(account);
        this.currentUserSignal.set(user);
        this.loadingSignal.set(false);
      },
      error: () => this.handleAuthenticationError('No se pudo consultar el servicio IAM.')
    });
  }

  signOut(): void {
    this.currentAccountSignal.set(null);
    this.currentUserSignal.set(null);
    this.errorSignal.set(null);
  }

  private handleAuthenticationError(message: string): void {
    this.currentAccountSignal.set(null);
    this.currentUserSignal.set(null);
    this.errorSignal.set(message);
    this.loadingSignal.set(false);
  }
}
