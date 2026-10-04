import {RegistrationRole} from '../domain/model/register-account.command';

/** Payload accepted by the account registration endpoint. */
export interface RegisterAccountRequest {
  email: string;
  password: string;
  role: RegistrationRole;
}
