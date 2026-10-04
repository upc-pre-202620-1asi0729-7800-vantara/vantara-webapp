import {BaseResource} from '../../shared/infrastructure/base-response';
import {RegistrationRole} from '../domain/model/registration-role';

/** Role representation returned by the Fake API. */
export interface RoleResource extends BaseResource {
  id: string;
  code: RegistrationRole | 'ADMIN';
  name: string;
}
