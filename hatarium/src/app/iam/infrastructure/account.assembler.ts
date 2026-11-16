import {Service} from '@angular/core';
import {Account, AccountStatus} from '../domain/model/account.entity';
import {AuthenticatedUserResource, UserResource} from './authentication.resources';

/** Maps IAM backend resources to the Account entity. */
@Service()
export class AccountAssembler {
  toEntityFromUserResource(resource: UserResource): Account {
    return new Account({
      id: resource.id,
      email: resource.email,
      status: resource.status as AccountStatus,
      roles: resource.roles ?? []
    });
  }

  /** Sign-in only succeeds for verified accounts, so the status is always active. */
  toEntityFromAuthenticatedResource(resource: AuthenticatedUserResource): Account {
    return new Account({
      id: resource.id,
      email: resource.email,
      status: AccountStatus.Active,
      roles: resource.roles ?? []
    });
  }
}
