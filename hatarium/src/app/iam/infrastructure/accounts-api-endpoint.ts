import {HttpClient} from '@angular/common/http';
import {BaseApiEndpoint} from '../../shared/infrastructure/base-api-endpoint';
import {Account} from '../domain/model/account.entity';
import {AccountAssembler} from './account.assembler';
import {AccountResource, AccountsResponse} from './account.response';
import {environment} from '../../../environments/environment';
import {inject, Service} from '@angular/core';

/** CRUD endpoint client for IAM accounts. */
@Service()
export class AccountsApiEndpoint extends BaseApiEndpoint<Account, AccountResource, AccountsResponse, AccountAssembler> {
  constructor() {
    super(
      inject(HttpClient),
      `${environment.serverBasePath}${environment.accountsEndpointPath}`,
      inject(AccountAssembler)
    );
  }
}
