import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'iam',
    loadChildren: () => import('./iam/presentation/iam.routes').then(module => module.iamRoutes)
  },
  {path: '', pathMatch: 'full', redirectTo: 'iam/sign-in'},
  {path: '**', redirectTo: 'iam/sign-in'}
];
