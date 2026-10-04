import {inject, Service} from '@angular/core';
import {Account} from '../domain/model/account.entity';
import {RegisterAccountCommand} from '../domain/model/register-account.command';
import {AccountAssembler} from './account.assembler';
import {RegisterAccountRequest} from './register-account.request';
import {RegistrationResponse} from './registration.response';
import {AccountStatus} from '../domain/model/account.entity';
import {AccountResource} from './account.response';
import {AccountCredentialResource} from './account-credential.response';
import {EmailVerificationResource} from './email-verification.response';

/** Maps the registration command and its transport representations. */
@Service()
export class RegistrationAssembler {
  private readonly accountAssembler = inject(AccountAssembler);

  toRequestFromCommand(command: RegisterAccountCommand): RegisterAccountRequest {
    return {
      email: command.email,
      password: command.password,
      role: command.role
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
