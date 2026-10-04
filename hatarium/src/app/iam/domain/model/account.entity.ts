import {BaseEntity} from '../../../shared/domain/model/base-entity';

/** Access states supported by an IAM account. */
export enum AccountStatus {
  Active = 'active',
  Inactive = 'inactive',
  Suspended = 'suspended'
}

/**
 * Represents the identity and access data used to enter the platform.
 * Personal profile information belongs to User and is linked by accountId.
 */
export class Account implements BaseEntity {
  private _id: string;
  private _roleId: string;
  private _email: string;
  private _status: AccountStatus;
  private _createdAt: string;

  constructor(props: {
    id: string;
    roleId: string;
    email: string;
    status: AccountStatus;
    createdAt: string;
  }) {
    this._id = props.id;
    this._roleId = props.roleId;
    this._email = props.email;
    this._status = props.status;
    this._createdAt = props.createdAt;
  }

  get id(): string { return this._id; }
  set id(value: string) { this._id = value; }

  get roleId(): string { return this._roleId; }
  set roleId(value: string) { this._roleId = value; }

  get email(): string { return this._email; }
  set email(value: string) { this._email = value; }

  get status(): AccountStatus { return this._status; }
  set status(value: AccountStatus) { this._status = value; }

  get createdAt(): string { return this._createdAt; }
}
