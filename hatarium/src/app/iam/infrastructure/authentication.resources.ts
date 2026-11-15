/** Body of `POST /authentication/sign-up`. */
export interface SignUpRequest {
  email: string;
  password: string;
  role: string;
}

/** Body of `POST /authentication/sign-in`. */
export interface SignInRequest {
  email: string;
  password: string;
}

/** Body of `POST /authentication/verify-email`. */
export interface VerifyEmailRequest {
  email: string;
  code: string;
}

/** Account returned by sign-up and verify-email. It never includes the password. */
export interface UserResource {
  id: number;
  email: string;
  status: string;
  roles: string[];
  lastSignInAt: string | null;
}

/** Account returned by sign-in, with the bearer token. */
export interface AuthenticatedUserResource {
  id: number;
  email: string;
  roles: string[];
  token: string;
}

/** Error body the backend returns for every failed request. */
export interface ErrorResource {
  code: string;
  message: string;
  details?: string;
}
