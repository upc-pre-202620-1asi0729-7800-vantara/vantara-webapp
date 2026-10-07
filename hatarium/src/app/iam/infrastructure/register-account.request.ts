import {RegistrationRole} from '../domain/model/registration-role';

/** Payload accepted by the account registration endpoint. */
export interface RegisterAccountRequest {
  email: string;
  password: string;
  role: RegistrationRole;
}
