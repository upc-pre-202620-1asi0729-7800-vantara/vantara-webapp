import { Routes } from '@angular/router';
import { SubscriptionConfigView } from './views/subscription-config-view/subscription-config-view';
import { PlansView } from './views/plans-view/plans-view';
import { PaymentMethodView } from './views/payment-method-view/payment-method-view';
import { ConfirmPaymentView } from './views/confirm-payment-view/confirm-payment-view';
import { PaymentSuccessView } from './views/payment-success-view/payment-success-view';
import { PaymentHistoryView } from './views/payment-history-view/payment-history-view';

/**
 * Routes for the payments bounded context.
 */
export const paymentsRoutes: Routes = [
  { path: '', component: SubscriptionConfigView },
  { path: 'plans', component: PlansView },
  { path: 'method', component: PaymentMethodView },
  { path: 'confirm', component: ConfirmPaymentView },
  { path: 'success', component: PaymentSuccessView },
  { path: 'history', component: PaymentHistoryView }
];
