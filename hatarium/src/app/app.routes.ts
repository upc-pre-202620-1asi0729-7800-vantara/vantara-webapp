import { Routes } from '@angular/router';

import { AnimalList } from './livestock-management/presentation/components/animal-list/animal-list';
import { AnimalAdd } from './livestock-management/presentation/components/animal-add/animal-add';
import { AnimalDetail } from './livestock-management/presentation/components/animal-detail/animal-detail';

import { FeedingDashboard } from './livestock-management/presentation/components/feeding-dashboard/feeding-dashboard';
import { FeedingPlanDetail } from './livestock-management/presentation/components/feeding-plan-detail/feeding-plan-detail';
import {FeedingPlanCreate} from './livestock-management/presentation/components/feeding-plan-add/feeding-plan-add';

export const routes: Routes = [

  {
    path: 'livestock/animals',
    component: AnimalList
  },
  {
    path: 'livestock/animals/add',
    component: AnimalAdd
  },
  {
    path: 'livestock/animals/:id',
    component: AnimalDetail
  },

  {
    path: 'livestock/feeding',
    component: FeedingDashboard
  },
  {
    path: 'livestock/feeding/add',
    component: FeedingPlanCreate
  },
  {
    path: 'livestock/feeding/:id',
    component: FeedingPlanDetail
  },

  {
    path: '',
    redirectTo: 'livestock/animals',
    pathMatch: 'full'
  }
];
