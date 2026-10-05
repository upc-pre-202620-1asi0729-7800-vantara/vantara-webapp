import { Injectable } from '@angular/core';
import { Payment } from '../domain/model/payment.entity';
import { PaymentResource } from './payments-response';

/**
 * Maps raw payment resources into Payment entities.
 */
@Injectable({ providedIn: 'root' })
export class PaymentAssembler {
  toEntityFromResource(resource: PaymentResource): Payment {
    const payment = new Payment();
    payment.id = resource.id;
    payment.rancherId = resource.rancherId;
    payment.appointmentId = resource.appointmentId ?? null;
    payment.concept = resource.concept;
    payment.amount = resource.amount;
    payment.currency = resource.currency;
    payment.status = resource.status;
    payment.createdAt = resource.createdAt;
    payment.confirmedAt = resource.confirmedAt ?? null;
    payment.cancelledAt = resource.cancelledAt ?? null;
    return payment;
  }

  toEntitiesFromResponse(resources: PaymentResource[]): Payment[] {
    return resources.map(resource => this.toEntityFromResource(resource));
  }
}
