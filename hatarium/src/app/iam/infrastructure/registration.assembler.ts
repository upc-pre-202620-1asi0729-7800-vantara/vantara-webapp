import {inject, Service} from '@angular/core';
import {Account} from '../domain/model/account.entity';
import {RegistrationRole} from '../domain/model/registration-role';
import {AccountAssembler} from './account.assembler';
import {RegisterAccountRequest} from './register-account.request';
import {RegistrationResponse} from './registration.response';
import {AccountStatus} from '../domain/model/account.entity';
import {AccountResource} from './account.response';
import {AccountCredentialResource} from './account-credential.response';
import {EmailVerificationResource} from './email-verification.response';

/** Maps registration form values and transport representations. */
@Service()
export class RegistrationAssembler {
  private readonly accountAssembler = inject(AccountAssembler);

  toRequest(email: string, password: string, role: RegistrationRole): RegisterAccountRequest {
    return {
      email: email.trim().toLowerCase(),
      password,
      role
    };
  }

  toEntityFromResponse(response: RegistrationResponse): Account {
    return this.accountAssembler.toEntityFromResource(response);
  }

  toAccountResource(request: RegisterAccountRequest, roleId: string, accountId: string): AccountResource {
    return {
      id: accountId,
      roleId,
      email: request.email,
      status: AccountStatus.Inactive,
      emailVerified: false,
      createdAt: new Date().toISOString().slice(0, 10)
    };
  }

  toCredentialResource(accountId: string, passwordHash: string): AccountCredentialResource {
    return {
      id: `cred-${crypto.randomUUID()}`,
      accountId,
      passwordHash
    };
  }

  toVerificationResource(accountId: string, code: string): EmailVerificationResource {
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString();
    return {
      id: `ver-${crypto.randomUUID()}`,
      accountId,
      code,
      expiresAt,
      verifiedAt: null
    };
  }
}
