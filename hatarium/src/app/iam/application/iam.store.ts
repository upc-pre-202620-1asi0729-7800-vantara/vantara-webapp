import {computed, inject, Service, signal} from '@angular/core';
import {Account, AccountStatus} from '../domain/model/account.entity';
import {IamApi} from '../infrastructure/iam-api';
import {RegistrationRole} from '../domain/model/registration-role';
import { firstValueFrom } from 'rxjs';

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
  readonly ready: Promise<void>;

  constructor() {
    const id = sessionStorage.getItem('hatarium.accountId');
    this.ready = id ? firstValueFrom(this.iamApi.getAccountById(id)).then(account => {
      if (sessionStorage.getItem('hatarium.accountId') === id && account.status === AccountStatus.Active && account.emailVerified) {
        this.currentAccountSignal.set(account);
      } else if (sessionStorage.getItem('hatarium.accountId') === id) {
        sessionStorage.removeItem('hatarium.accountId');
      }
    }).catch(() => { sessionStorage.removeItem('hatarium.accountId'); }) : Promise.resolve();
  }

  registerAccount(email: string, password: string, role: RegistrationRole, fullName: string, organizationName: string): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.iamApi.registerAccount(email, password, role, fullName, organizationName).subscribe({
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
   * Starts a mock session and validates credentials when the account has them.
   */
  signIn(email: string, password: string): void {
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

        this.iamApi.validatePassword(account.id, password).subscribe({
          next: valid => {
            if (!valid) {
              this.handleAuthenticationError('La contraseña es incorrecta.');
              return;
            }
            sessionStorage.setItem('hatarium.accountId', account.id);
            this.currentAccountSignal.set(account);
            this.loadingSignal.set(false);
          },
          error: () => this.handleAuthenticationError('No se pudieron validar las credenciales.'),
        });
      },
      error: () => this.handleAuthenticationError('No se pudo consultar el servicio IAM.')
    });
  }

  signOut(): void {
    sessionStorage.removeItem('hatarium.accountId');
    this.currentAccountSignal.set(null);
    this.errorSignal.set(null);
  }

  private handleAuthenticationError(message: string): void {
    sessionStorage.removeItem('hatarium.accountId');
    this.currentAccountSignal.set(null);
    this.errorSignal.set(message);
    this.loadingSignal.set(false);
  }
}
