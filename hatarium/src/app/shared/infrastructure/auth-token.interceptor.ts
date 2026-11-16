import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IamStore } from '../../iam/application/iam.store';

/** Session storage key where the sign-in flow keeps the backend JWT. */
export const AUTH_TOKEN_STORAGE_KEY = 'hatarium.token';

/**
 * Adds the Bearer token to requests aimed at the real backend only.
 * The fake API never receives the token, and nothing is added while there is no session token.
 * When the backend rejects a protected request with 401 (expired or invalid token),
 * the session is closed and the user is sent back to the sign-in screen.
 */
export const authTokenInterceptor: HttpInterceptorFn = (request, next) => {
  if (!request.url.startsWith(environment.vantaraBackendBaseUrl)) {
    return next(request);
  }

  const injector = inject(Injector);
  const isPublicAuthenticationCall = request.url.startsWith(`${environment.vantaraBackendBaseUrl}/authentication/`);

  let token: string | null = null;
  try {
    token = sessionStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
  } catch {
    token = null;
  }

  const outgoing = token && !isPublicAuthenticationCall
    ? request.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : request;

  return next(outgoing).pipe(
    catchError((error: unknown) => {
      if (error instanceof HttpErrorResponse && error.status === 401 && token && !isPublicAuthenticationCall) {
        // Resolved lazily: IamStore depends on HttpClient, which depends on this interceptor.
        injector.get(IamStore).signOut();
        void injector.get(Router).navigate(['/iam/sign-in']);
      }
      return throwError(() => error);
    })
  );
};
