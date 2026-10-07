import {inject, Service} from '@angular/core';
import {Account} from '../domain/model/account.entity';
import {AccountAssembler} from './account.assembler';
import {VerifyEmailRequest} from './verify-email.request';
import {EmailVerificationResponse} from './email-verification.response';

/** Maps email-verification form values and transport representations. */
@Service()
export class EmailVerificationAssembler {
  private readonly accountAssembler = inject(AccountAssembler);

  toRequest(email: string, code: string): VerifyEmailRequest {
    return {
      email: email.trim().toLowerCase(),
      code: code.trim()
    };
  }

  toEntityFromResponse(response: EmailVerificationResponse): Account {
    return this.accountAssembler.toEntityFromResource(response);
  }
}
