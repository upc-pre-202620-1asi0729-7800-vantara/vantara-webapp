import {TestBed} from '@angular/core/testing';
import {Router, provideRouter} from '@angular/router';
import {SubscriptionPaymentView} from './subscription-payment-view';
import {PaymentService} from '../../../application/payment.service';

class PaymentServiceStub {
  create(): void {
  }
}

/** Verifies the checkout flow ends on the home page. */
describe('SubscriptionPaymentView', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SubscriptionPaymentView],
      providers: [
        provideRouter([]),
        {provide: PaymentService, useClass: PaymentServiceStub}
      ]
    });
  });

  it('navigates to /home after a successful payment', () => {
    const fixture = TestBed.createComponent(SubscriptionPaymentView);
    const component = fixture.componentInstance;
    const router = TestBed.inject(Router);
    const navigateSpy = vi.spyOn(router, 'navigateByUrl').mockResolvedValue(true);

    component.form.setValue({
      cardNumber: '1234 5678 9012 3456',
      cardHolder: 'Juan Quispe',
      expiry: '12/30',
      cvv: '123'
    });

    component.pay();

    expect(navigateSpy).toHaveBeenCalledWith('/home');
  });
});
