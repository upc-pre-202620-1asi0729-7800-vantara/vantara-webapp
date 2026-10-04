import {BaseResource, BaseResponse} from '../../shared/infrastructure/base-response';
import {AccountStatus} from '../domain/model/account.entity';

/** Resource representation returned by the accounts endpoint. */
export interface AccountResource extends BaseResource {
  id: string;
  roleId: string;
  email: string;
  status: AccountStatus;
  createdAt: string;
  emailVerified: boolean;
}

/** Optional envelope supported in addition to the JSON Server array response. */
export interface AccountsResponse extends BaseResponse {
  accounts: AccountResource[];
}
