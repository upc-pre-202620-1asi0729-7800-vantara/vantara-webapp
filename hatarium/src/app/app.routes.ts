import { Routes } from '@angular/router';
import { Layout } from './shared/presentation/components/layout/layout';

export const routes: Routes = [
  {
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
];
