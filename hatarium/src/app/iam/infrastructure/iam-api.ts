import {inject, Service} from '@angular/core';
import {Observable} from 'rxjs';
import {Account} from '../domain/model/account.entity';
import {RegistrationRole} from '../domain/model/registration-role';
import {AuthenticatedSession, IamApiEndpoint} from './iam-api-endpoint';

/** Infrastructure facade for the IAM backend. */
@Service()
export class IamApi {
  private readonly authenticationEndpoint = inject(IamApiEndpoint);

  signUp(email: string, password: string, role: RegistrationRole): Observable<Account> {
    return this.authenticationEndpoint.signUp(email, password, role);
  }

  verifyEmail(email: string, code: string): Observable<Account> {
    return this.authenticationEndpoint.verifyEmail(email, code);
  }

  sendVerificationCode(email: string): Observable<void> {
    return this.authenticationEndpoint.sendVerificationCode(email);
  }

  signIn(email: string, password: string): Observable<AuthenticatedSession> {
    return this.authenticationEndpoint.signIn(email, password);
  }
}
