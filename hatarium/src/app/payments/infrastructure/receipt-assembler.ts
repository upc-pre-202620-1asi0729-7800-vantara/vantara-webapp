import { Injectable } from '@angular/core';
import { Receipt } from '../domain/model/receipt.entity';
import { ReceiptResource } from './payments-response';

/**
 * Maps raw receipt resources into Receipt entities.
 */
@Injectable({ providedIn: 'root' })
export class ReceiptAssembler {
  toEntityFromResource(resource: ReceiptResource): Receipt {
    const receipt = new Receipt();
    receipt.id = resource.id;
    receipt.paymentId = resource.paymentId;
    receipt.receiptNumber = resource.receiptNumber;
    receipt.issuedAt = resource.issuedAt;
    receipt.documentUrl = resource.documentUrl ?? '';
    return receipt;
  }

  toEntityFromResourceOrNull(resource: ReceiptResource | null | undefined): Receipt | null {
    return resource ? this.toEntityFromResource(resource) : null;
  }
}
