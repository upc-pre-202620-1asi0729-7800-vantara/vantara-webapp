import {inject, Service} from '@angular/core';
import {Observable} from 'rxjs';
import {BaseApi} from '../../shared/infrastructure/base-api';
import {Account} from '../domain/model/account.entity';
import {AccountsApiEndpoint} from './accounts-api-endpoint';
import {RegistrationRole} from '../domain/model/registration-role';
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

  registerAccount(email: string, password: string, role: RegistrationRole): Observable<Account> {
    return this.authenticationEndpoint.registerAccount(email, password, role);
  }

  verifyEmail(email: string, code: string): Observable<Account> {
    return this.authenticationEndpoint.verifyEmail(email, code);
  }

}
