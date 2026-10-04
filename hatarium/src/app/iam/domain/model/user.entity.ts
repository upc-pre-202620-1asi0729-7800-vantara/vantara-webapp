import {BaseEntity} from '../../../shared/domain/model/base-entity';

/** Visual themes supported by the user profile. */
export enum UserTheme {
  Light = 'light',
  Dark = 'dark'
}

/**
 * Represents the personal profile associated one-to-one with an IAM account.
 * Authentication and authorization data remain in the Account entity.
 */
export class User implements BaseEntity {
  private _id: string;
  private _accountId: string;
  private _fullName: string;
  private _phone: string;
  private _photoUrl: string;
  private _theme: UserTheme;
  private _locale: string;

  constructor(props: {
    id: string;
    accountId: string;
    fullName: string;
    phone: string;
    photoUrl: string;
    theme: UserTheme;
    locale: string;
  }) {
    this._id = props.id;
    this._accountId = props.accountId;
    this._fullName = props.fullName;
    this._phone = props.phone;
    this._photoUrl = props.photoUrl;
    this._theme = props.theme;
    this._locale = props.locale;
  }

  get id(): string { return this._id; }
  set id(value: string) { this._id = value; }

  get accountId(): string { return this._accountId; }

  get fullName(): string { return this._fullName; }
  set fullName(value: string) { this._fullName = value; }

  get phone(): string { return this._phone; }
  set phone(value: string) { this._phone = value; }

  get photoUrl(): string { return this._photoUrl; }
  set photoUrl(value: string) { this._photoUrl = value; }

  get theme(): UserTheme { return this._theme; }
  set theme(value: UserTheme) { this._theme = value; }

  get locale(): string { return this._locale; }
  set locale(value: string) { this._locale = value; }
}
