import { Routes } from '@angular/router';
import { ReproductionDashboard } from './views/reproduction-dashboard/reproduction-dashboard';
import { EventSelector } from './views/event-selector/event-selector';
import { PregnancyEventForm } from './views/event-forms/pregnancy-event-form/pregnancy-event-form';
import { CalvingEventForm } from './views/event-forms/calving-event-form/calving-event-form';
import { DryOffEventForm } from './views/event-forms/dry-off-event-form/dry-off-event-form';
import { WeaningEventForm } from './views/event-forms/weaning-event-form/weaning-event-form';

/**
 * Routes for the reproductive bounded context.
 */
export const reproductiveRoutes: Routes = [
  { path: '', component: ReproductionDashboard },
  { path: 'new-event-reproductive', component: EventSelector },
  { path: 'events/pregnancy', component: PregnancyEventForm },
  { path: 'events/calving', component: CalvingEventForm },
  { path: 'events/dry-off', component: DryOffEventForm },
  { path: 'events/weaning', component: WeaningEventForm }
];
