import {HttpClient} from '@angular/common/http';
import {inject, Service} from '@angular/core';
import {catchError, forkJoin, from, map, Observable, switchMap, throwError} from 'rxjs';
import {environment} from '../../../environments/environment';
import {ErrorHandlingEnabledBaseType} from '../../shared/infrastructure/error-handling-enabled-base-type';
import {Account, AccountStatus} from '../domain/model/account.entity';
import {RegisterAccountCommand} from '../domain/model/register-account.command';
import {VerifyEmailCommand} from '../domain/model/verify-email.command';
import {EmailVerificationAssembler} from './email-verification.assembler';
import {EmailVerificationResponse} from './email-verification.response';
import {RegistrationAssembler} from './registration.assembler';
import {RegistrationResponse} from './registration.response';
import {AccountResource} from './account.response';
import {RoleResource} from './role.response';
import {AccountCredentialResource} from './account-credential.response';
import {EmailVerificationResource} from './email-verification.response';

/** Endpoint client for IAM authentication workflows. */
@Service()
export class IamApiEndpoint extends ErrorHandlingEnabledBaseType {
  private readonly http = inject(HttpClient);
  private readonly registrationAssembler = inject(RegistrationAssembler);
  private readonly emailVerificationAssembler = inject(EmailVerificationAssembler);

  registerAccount(command: RegisterAccountCommand): Observable<Account> {
    const request = this.registrationAssembler.toRequestFromCommand(command);
    const accountsUrl = `${environment.serverBasePath}${environment.accountsEndpointPath}`;
    const rolesUrl = `${environment.serverBasePath}${environment.rolesEndpointPath}`;
    const credentialsUrl = `${environment.serverBasePath}${environment.accountCredentialsEndpointPath}`;
    const verificationsUrl = `${environment.serverBasePath}${environment.emailVerificationsEndpointPath}`;

    return forkJoin({
      accounts: this.http.get<AccountResource[]>(accountsUrl, {params: {email: request.email}}),
      roles: this.http.get<RoleResource[]>(rolesUrl, {params: {code: request.role}})
    }).pipe(
      switchMap(({accounts, roles}) => {
        if (accounts.length > 0) {
          return throwError(() => new Error('Email already registered'));
        }

        const role = roles[0];
        if (!role) {
          return throwError(() => new Error('Registration role not found'));
        }

        const accountId = `acc-${crypto.randomUUID()}`;
        const account = this.registrationAssembler.toAccountResource(request, role.id, accountId);
        const verificationCode = this.generateVerificationCode();

        return from(this.hashPassword(request.password)).pipe(
          switchMap(passwordHash => forkJoin({
            account: this.http.post<RegistrationResponse>(accountsUrl, account),
            credential: this.http.post<AccountCredentialResource>(
              credentialsUrl,
              this.registrationAssembler.toCredentialResource(accountId, passwordHash)
            ),
            verification: this.http.post<EmailVerificationResource>(
              verificationsUrl,
              this.registrationAssembler.toVerificationResource(accountId, verificationCode)
            )
          })),
          map(result => this.registrationAssembler.toEntityFromResponse(result.account))
        );
      }),
      catchError(this.handleError('Failed to register account'))
    );
  }

  verifyEmail(command: VerifyEmailCommand): Observable<Account> {
    const request = this.emailVerificationAssembler.toRequestFromCommand(command);
    const accountsUrl = `${environment.serverBasePath}${environment.accountsEndpointPath}`;
    const verificationsUrl = `${environment.serverBasePath}${environment.emailVerificationsEndpointPath}`;

    return this.http.get<AccountResource[]>(accountsUrl, {params: {email: request.email}}).pipe(
      switchMap(accounts => {
        const account = accounts[0];
        if (!account) {
          return throwError(() => new Error('Account not found'));
        }

        return this.http.get<EmailVerificationResource[]>(verificationsUrl, {
          params: {accountId: account.id, code: request.code}
        }).pipe(
          switchMap(verifications => {
            const verification = verifications.find(item =>
              item.verifiedAt === null && new Date(item.expiresAt).getTime() > Date.now()
            );
            if (!verification) {
              return throwError(() => new Error('Verification code is invalid or expired'));
            }

            const verifiedAccount: EmailVerificationResponse = {
              ...account,
              status: AccountStatus.Active,
              emailVerified: true
            };

            return forkJoin({
              account: this.http.patch<EmailVerificationResponse>(
                `${accountsUrl}/${account.id}`,
                {status: AccountStatus.Active, emailVerified: true}
              ),
              verification: this.http.patch<EmailVerificationResource>(
                `${verificationsUrl}/${verification.id}`,
                {verifiedAt: new Date().toISOString()}
              )
            }).pipe(map(() => this.emailVerificationAssembler.toEntityFromResponse(verifiedAccount)));
          })
        );
      }),
      catchError(this.handleError('Failed to verify email'))
    );
  }

  private generateVerificationCode(): string {
    const randomValue = crypto.getRandomValues(new Uint32Array(1))[0] % 1_000_000;
    return randomValue.toString().padStart(6, '0');
  }

  private async hashPassword(password: string): Promise<string> {
    const bytes = new TextEncoder().encode(password);
    const digest = await crypto.subtle.digest('SHA-256', bytes);
    return Array.from(new Uint8Array(digest))
      .map(byte => byte.toString(16).padStart(2, '0'))
      .join('');
  }
}
