import {Routes} from '@angular/router';

const signIn = () => import('./views/sign-in/sign-in').then(module => module.SignIn);
const signUp = () => import('./views/sign-up/sign-up').then(module => module.SignUp);
const verifyEmail = () => import('./views/verify-email/verify-email').then(module => module.VerifyEmail);

/** Route tree for the public IAM presentation layer. */
export const iamRoutes: Routes = [
  {path: 'sign-in', loadComponent: signIn},
  {path: 'sign-up', loadComponent: signUp},
  {path: 'verify-email', loadComponent: verifyEmail},
  {path: '', pathMatch: 'full', redirectTo: 'sign-in'}
];
