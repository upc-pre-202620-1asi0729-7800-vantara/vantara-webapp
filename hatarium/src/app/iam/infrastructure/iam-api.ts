import {inject, Service} from '@angular/core';
import {Observable} from 'rxjs';
import {BaseApi} from '../../shared/infrastructure/base-api';
import {Account} from '../domain/model/account.entity';
import {User} from '../domain/model/user.entity';
import {AccountsApiEndpoint} from './accounts-api-endpoint';
import {UsersApiEndpoint} from './users-api-endpoint';

/** Infrastructure facade for the resources owned by the IAM context. */
@Service()
export class IamApi extends BaseApi {
  private readonly accountsEndpoint = inject(AccountsApiEndpoint);
  private readonly usersEndpoint = inject(UsersApiEndpoint);

  getAccounts(): Observable<Account[]> {
    return this.accountsEndpoint.getAll();
  }

  getAccountById(accountId: string): Observable<Account> {
    return this.accountsEndpoint.getById(accountId);
  }

  getUsers(): Observable<User[]> {
    return this.usersEndpoint.getAll();
  }

  getUserById(userId: string): Observable<User> {
    return this.usersEndpoint.getById(userId);
  }
}
