import {BaseResource} from '../../shared/infrastructure/base-response';
import {RegistrationRole} from '../domain/model/register-account.command';

/** Role representation returned by the Fake API. */
export interface RoleResource extends BaseResource {
  id: string;
  code: RegistrationRole | 'ADMIN';
  name: string;
}
