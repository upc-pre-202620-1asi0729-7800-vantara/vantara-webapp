import {BaseResource, BaseResponse} from '../../shared/infrastructure/base-response';
import {UserTheme} from '../domain/model/user.entity';

/** Resource representation returned by the users endpoint. */
export interface UserResource extends BaseResource {
  id: string;
  accountId: string;
  fullName: string;
  phone: string;
  photoUrl: string;
  theme: UserTheme;
  locale: string;
}

/** Optional envelope supported in addition to the JSON Server array response. */
export interface UsersResponse extends BaseResponse {
  users: UserResource[];
}
