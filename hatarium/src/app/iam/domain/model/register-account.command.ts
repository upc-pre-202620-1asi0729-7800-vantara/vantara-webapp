/** Roles that can be selected during public account registration. */
export enum RegistrationRole {
  Rancher = 'RANCHER',
  Veterinarian = 'VETERINARIAN'
}

/** Captures the information required to register an IAM account. */
export class RegisterAccountCommand {
  readonly email: string;
  readonly password: string;
  readonly role: RegistrationRole;

  constructor(props: {email: string; password: string; role: RegistrationRole}) {
    this.email = props.email.trim().toLowerCase();
    this.password = props.password;
    this.role = props.role;
  }
}
