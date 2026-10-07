import {BaseResource} from '../../shared/infrastructure/base-response';
import {AccountResource} from './account.response';

/** Mock-only verification challenge stored by the Fake API. */
export interface EmailVerificationResource extends BaseResource {
  id: string;
  accountId: string;
  code: string;
  expiresAt: string;
  verifiedAt: string | null;
}

/** Updated account returned after successful email verification. */
export interface EmailVerificationResponse extends AccountResource {}
