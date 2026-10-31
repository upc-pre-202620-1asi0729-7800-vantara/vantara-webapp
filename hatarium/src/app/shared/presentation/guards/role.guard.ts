import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { IamStore } from '../../../iam/application/iam.store';
import { SessionProfile } from '../../application/session-profile';

/**
 * Protects a route by role code (RANCHER, VETERINARIAN, ADMIN).
 * Anonymous users go to IAM; authenticated users without the required role
 * are sent to their own landing page instead of seeing a broken screen.
 */
export function roleGuard(allowedRoles: string[]): CanActivateFn {
  return async () => {
    const iamStore = inject(IamStore);
    const session = inject(SessionProfile);
    const router = inject(Router);

    await iamStore.ready;
    await session.roleReady;

    if (!iamStore.isAuthenticated()) {
      return router.createUrlTree(['/iam/sign-in']);
    }

    const roleCode = session.roleCode();
    return roleCode && allowedRoles.includes(roleCode)
      ? true
      : router.createUrlTree(['/home']);
  };
}

/** Convenience guard for the veterinarian workspace. */
export const veterinarianGuard = roleGuard(['VETERINARIAN', 'ADMIN']);
