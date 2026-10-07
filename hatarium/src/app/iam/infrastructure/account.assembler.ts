import {BaseAssembler} from '../../shared/infrastructure/base-assembler';
import {Account} from '../domain/model/account.entity';
import {AccountResource, AccountsResponse} from './account.response';
import {Service} from '@angular/core';

/** Maps Account entities to and from API resources. */
@Service()
export class AccountAssembler implements BaseAssembler<Account, AccountResource, AccountsResponse> {
  toEntityFromResource(resource: AccountResource): Account {
    return new Account(resource);
  }

  toResourceFromEntity(entity: Account): AccountResource {
    return {
      id: entity.id,
      roleId: entity.roleId,
      email: entity.email,
      status: entity.status,
      createdAt: entity.createdAt,
      emailVerified: entity.emailVerified
    };
  }

  toEntitiesFromResponse(response: AccountsResponse): Account[] {
    return response.accounts.map(resource => this.toEntityFromResource(resource));
  }
}
