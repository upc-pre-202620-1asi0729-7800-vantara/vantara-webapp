import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { IamStore } from '../../../iam/application/iam.store';

/**
 * Blocks the private layout for anonymous visitors and sends them to the
 * shared IAM sign-in screen.
 */
export const authGuard: CanActivateFn = async () => {
  const iamStore = inject(IamStore);
  const router = inject(Router);

  await iamStore.ready;

  return iamStore.isAuthenticated()
    ? true
    : router.createUrlTree(['/iam/sign-in']);
};
