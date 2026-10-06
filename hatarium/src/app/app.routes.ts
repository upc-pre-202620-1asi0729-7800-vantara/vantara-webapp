import { Routes } from '@angular/router';
import { Layout } from './shared/presentation/components/layout/layout';

export const routes: Routes = [
  {
<<<<<<< HEAD
    path: 'iam',
    loadChildren: () => import('./iam/presentation/iam.routes').then(module => module.iamRoutes)
  },
  {path: '', pathMatch: 'full', redirectTo: 'iam/sign-in'},
  {path: '**', redirectTo: 'iam/sign-in'}
=======
    path: '',
    component: Layout,
    children: [
      {
        path: 'reproductive',
        loadChildren: () =>
          import('./reproductive/presentation/reproductive.routes').then(m => m.reproductiveRoutes)
      },
      { path: '', redirectTo: 'reproductive', pathMatch: 'full' }
    ]
  }
>>>>>>> feature/reproductive
];
