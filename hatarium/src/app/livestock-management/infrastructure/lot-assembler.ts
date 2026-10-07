import { Service } from '@angular/core';
import { Lot } from '../domain/model/lot.entity';
import {LotResource, LotsResponse} from './lots-response';

@Service()
export class LotAssembler {

  toEntityFromResource(resource: LotResource): Lot {
    let lot = new Lot();
    lot.id = resource.id;
    lot.rancherId = resource.rancherId;
    lot.name = resource.name;
    lot.purpose = resource.purpose;
    lot.status = resource.status;
    return lot;
  }

  toEntitiesFromResponse(response: LotsResponse): Lot[] {
    return response.lots.map((resource) =>
      this.toEntityFromResource(resource)
    );
  }
}
