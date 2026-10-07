import {BaseResource} from '../../shared/infrastructure/base-response';

/** Mock-only credential persisted separately from the public account resource. */
export interface AccountCredentialResource extends BaseResource {
  id: string;
  accountId: string;
  passwordHash: string;
}
