import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {inject, Service} from '@angular/core';
import {catchError, map, Observable, throwError} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Account} from '../domain/model/account.entity';
import {RegistrationRole} from '../domain/model/registration-role';
import {AccountAssembler} from './account.assembler';
import {AuthenticatedUserResource, ErrorResource, UserResource} from './authentication.resources';

/** Account plus the bearer token returned by a successful sign-in. */
export interface AuthenticatedSession {
  account: Account;
  token: string;
}

/** Error raised by the IAM client, carrying the HTTP status and the backend message. */
export class IamApiError extends Error {
  constructor(readonly status: number, readonly code: string, message: string) {
    super(message);
  }
}

/** Endpoint client for the public `/authentication` routes of the IAM backend. */
@Service()
export class IamApiEndpoint {
  private readonly http = inject(HttpClient);
  private readonly assembler = inject(AccountAssembler);
  private readonly authenticationUrl = `${environment.vantaraBackendBaseUrl}/authentication`;

  signUp(email: string, password: string, role: RegistrationRole): Observable<Account> {
    return this.http.post<UserResource>(`${this.authenticationUrl}/sign-up`, {
      email: email.trim().toLowerCase(), password, role
    }).pipe(
      map(resource => this.assembler.toEntityFromUserResource(resource)),
      catchError(error => this.toIamError(error))
    );
  }

  verifyEmail(email: string, code: string): Observable<Account> {
    return this.http.post<UserResource>(`${this.authenticationUrl}/verify-email`, {
      email: email.trim().toLowerCase(), code: code.trim()
    }).pipe(
      map(resource => this.assembler.toEntityFromUserResource(resource)),
      catchError(error => this.toIamError(error))
    );
  }

  sendVerificationCode(email: string): Observable<void> {
    return this.http.post<unknown>(`${this.authenticationUrl}/send-verification-code`, {
      email: email.trim().toLowerCase()
    }).pipe(
      map(() => undefined),
      catchError(error => this.toIamError(error))
    );
  }

  signIn(email: string, password: string): Observable<AuthenticatedSession> {
    return this.http.post<AuthenticatedUserResource>(`${this.authenticationUrl}/sign-in`, {
      email: email.trim().toLowerCase(), password
    }).pipe(
      map(resource => ({
        account: this.assembler.toEntityFromAuthenticatedResource(resource),
        token: resource.token
      })),
      catchError(error => this.toIamError(error))
    );
  }

  private toIamError(error: HttpErrorResponse): Observable<never> {
    const body = error.error as Partial<ErrorResource> | null;
    const message = typeof body?.message === 'string' ? body.message : '';
    return throwError(() => new IamApiError(error.status, body?.code ?? '', message));
  }
}
