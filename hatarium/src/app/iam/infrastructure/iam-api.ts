import {inject, Service} from '@angular/core';
import {Observable} from 'rxjs';
import {BaseApi} from '../../shared/infrastructure/base-api';
import {Account} from '../domain/model/account.entity';
import {AccountsApiEndpoint} from './accounts-api-endpoint';
import {RegisterAccountCommand} from '../domain/model/register-account.command';
import {VerifyEmailCommand} from '../domain/model/verify-email.command';
import {IamApiEndpoint} from './iam-api-endpoint';

/** Infrastructure facade for the resources owned by the IAM context. */
@Service()
export class IamApi extends BaseApi {
  private readonly accountsEndpoint = inject(AccountsApiEndpoint);
  private readonly authenticationEndpoint = inject(IamApiEndpoint);

  getAccounts(): Observable<Account[]> {
    return this.accountsEndpoint.getAll();
  }

  getAccountById(accountId: string): Observable<Account> {
    return this.accountsEndpoint.getById(accountId);
  }

  registerAccount(command: RegisterAccountCommand): Observable<Account> {
    return this.authenticationEndpoint.registerAccount(command);
  }

  verifyEmail(command: VerifyEmailCommand): Observable<Account> {
    return this.authenticationEndpoint.verifyEmail(command);
  }

}
