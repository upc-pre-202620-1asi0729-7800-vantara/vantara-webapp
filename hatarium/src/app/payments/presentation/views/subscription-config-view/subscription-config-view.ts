import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { PaymentStore } from '../../../application/payment.store';
import { TranslatePipe } from '@ngx-translate/core';

/**
 * View that summarizes the subscription and recent payments.
 */
@Component({
  selector: 'app-subscription-config-view',
  imports: [RouterLink, MatButtonModule, MatCardModule, TranslatePipe],
  templateUrl: './subscription-config-view.html',
  styleUrl: './subscription-config-view.css',
  changeDetection: ChangeDetectionStrategy.Eager
})
export class SubscriptionConfigView implements OnInit {
  protected store = inject(PaymentStore);

  ngOnInit(): void {
    this.store.load();
  }
}
