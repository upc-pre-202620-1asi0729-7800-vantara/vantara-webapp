import { Injectable } from '@angular/core';
import { Transaction } from '../domain/model/transaction.entity';
import { TransactionResource } from './payments-response';

/**
 * Maps raw transaction resources into Transaction entities.
 */
@Injectable({ providedIn: 'root' })
export class TransactionAssembler {
  toEntityFromResource(resource: TransactionResource): Transaction {
    const transaction = new Transaction();
    transaction.id = resource.id;
    transaction.paymentId = resource.paymentId;
    transaction.provider = resource.provider;
    transaction.providerReference = resource.providerReference ?? null;
    transaction.status = resource.status;
    transaction.attemptedAt = resource.attemptedAt;
    transaction.failureReason = resource.failureReason ?? null;
    return transaction;
  }

  toEntitiesFromResponse(resources: TransactionResource[]): Transaction[] {
    return resources.map(resource => this.toEntityFromResource(resource));
  }
}
