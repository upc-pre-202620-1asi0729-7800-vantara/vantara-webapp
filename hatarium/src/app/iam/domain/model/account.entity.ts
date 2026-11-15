/** Access states returned by the IAM backend. */
export enum AccountStatus {
  PendingVerification = 'PENDING_VERIFICATION',
  Active = 'ACTIVE'
}

/**
 * Represents the identity and access data used to enter the platform.
 * Personal profile information belongs to the Profile Management bounded context.
 */
export class Account {
  private readonly _id: number;
  private readonly _email: string;
  private readonly _status: AccountStatus;
  private readonly _roles: string[];

  constructor(props: { id: number; email: string; status: AccountStatus; roles: string[] }) {
    this._id = props.id;
    this._email = props.email;
    this._status = props.status;
    this._roles = [...props.roles];
  }

  /** Numeric IAM user id; it is the subject of the backend token. */
  get id(): number { return this._id; }

  get email(): string { return this._email; }

  get status(): AccountStatus { return this._status; }

  /** Backend role names, for example `ROLE_RANCHER`. */
  get roles(): string[] { return [...this._roles]; }

  get emailVerified(): boolean { return this._status === AccountStatus.Active; }

  /** Main role without the `ROLE_` prefix (`RANCHER`, `VETERINARIAN`, `FINAL_USER`). */
  get roleCode(): string {
    return (this._roles[0] ?? '').replace(/^ROLE_/, '');
  }
}
