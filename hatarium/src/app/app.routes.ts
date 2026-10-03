import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'reproductive',
    loadChildren: () =>
      import('./reproductive/presentation/reproductive.routes').then(m => m.reproductiveRoutes)
  },
  { path: '', redirectTo: 'reproductive', pathMatch: 'full' }
];
