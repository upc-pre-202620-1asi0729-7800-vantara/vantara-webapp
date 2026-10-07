/** Payload accepted by the email verification endpoint. */
export interface VerifyEmailRequest {
  email: string;
  code: string;
}
