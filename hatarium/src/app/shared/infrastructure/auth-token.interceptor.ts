import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

/** Session storage key where the sign-in flow keeps the backend JWT. */
export const AUTH_TOKEN_STORAGE_KEY = 'hatarium.token';

/**
 * Adds the Bearer token to requests aimed at the real backend only.
 * The fake API never receives the token, and nothing is added while there is no session token.
 */
export const authTokenInterceptor: HttpInterceptorFn = (request, next) => {
  if (!request.url.startsWith(environment.vantaraBackendBaseUrl)) {
    return next(request);
  }

  let token: string | null = null;
  try {
    token = sessionStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
  } catch {
    token = null;
  }

  return token
    ? next(request.clone({ setHeaders: { Authorization: `Bearer ${token}` } }))
    : next(request);
};
