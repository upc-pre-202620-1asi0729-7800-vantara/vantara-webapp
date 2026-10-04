/** Captures the one-time code used to verify a registered email address. */
export class VerifyEmailCommand {
  readonly email: string;
  readonly code: string;

  constructor(props: {email: string; code: string}) {
    this.email = props.email.trim().toLowerCase();
    this.code = props.code.trim();
  }
}
