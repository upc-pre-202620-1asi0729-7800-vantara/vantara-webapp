import { Service } from '@angular/core';
import {Movement} from '../domain/model/movement.entity';
import {MovementResource, MovementsResponse} from './movements-response';

@Service()
export class MovementAssembler {

  toEntityFromResource(resource: MovementResource): Movement {
    let movement = new Movement();
    movement.id = resource.id;
    movement.animalId = resource.animalId;
    movement.originLotId = resource.originLotId;
    movement.destinationLotId = resource.destinationLotId;
    movement.movementType = resource.movementType;
    movement.occurredAt = resource.occurredAt;
    movement.reason = resource.reason;
    movement.recordedBy = resource.recordedBy;
    return movement;
  }

  toEntitiesFromResponse(response: MovementsResponse): Movement[] {
    return response.movements.map((resource) =>
      this.toEntityFromResource(resource)
    );
  }
}

