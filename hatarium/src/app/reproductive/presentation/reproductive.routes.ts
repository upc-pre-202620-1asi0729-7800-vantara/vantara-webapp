import { Routes } from '@angular/router';
import { ReproductiveHistoryView } from './views/reproductive-history-view/reproductive-history-view';

/**
 * Routes for the reproductive bounded context.
 */
export const reproductiveRoutes: Routes = [
  { path: '', component: ReproductiveHistoryView }
];
