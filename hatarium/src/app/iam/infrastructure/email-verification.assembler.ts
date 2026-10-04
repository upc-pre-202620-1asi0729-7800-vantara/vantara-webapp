import {inject, Service} from '@angular/core';
import {Account} from '../domain/model/account.entity';
import {VerifyEmailCommand} from '../domain/model/verify-email.command';
import {AccountAssembler} from './account.assembler';
import {VerifyEmailRequest} from './verify-email.request';
import {EmailVerificationResponse} from './email-verification.response';

/** Maps the email-verification command and its transport representations. */
@Service()
export class EmailVerificationAssembler {
  private readonly accountAssembler = inject(AccountAssembler);

  toRequestFromCommand(command: VerifyEmailCommand): VerifyEmailRequest {
    return {
      email: command.email,
      code: command.code
    };
  }

  toEntityFromResponse(response: EmailVerificationResponse): Account {
    return this.accountAssembler.toEntityFromResource(response);
  }
}
