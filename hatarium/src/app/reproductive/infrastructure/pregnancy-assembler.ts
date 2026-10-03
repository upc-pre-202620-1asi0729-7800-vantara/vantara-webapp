import { Injectable } from '@angular/core';
import { Pregnancy } from '../domain/model/pregnancy.entity';
import { PregnancyResource } from './pregnancies-response';

/**
 * Maps pregnancy resources from the API into Pregnancy domain entities.
 */
@Injectable({ providedIn: 'root' })
export class PregnancyAssembler {

  /**
   * Converts a raw pregnancy resource into a Pregnancy entity.
   */
  toEntityFromResource(resource: PregnancyResource): Pregnancy {
    const pregnancy = new Pregnancy();
    pregnancy.id = resource.id;
    pregnancy.animalId = resource.animalId;
    pregnancy.calfId = resource.calfId ?? null;
    pregnancy.confirmedOn = resource.confirmedOn;
    pregnancy.expectedCalvingOn = resource.expectedCalvingOn ?? null;
    pregnancy.endedOn = resource.endedOn ?? null;
    pregnancy.outcome = resource.outcome ?? null;
    pregnancy.birthWeightKg = resource.birthWeightKg ?? null;
    pregnancy.dryOffOn = resource.dryOffOn ?? null;
    pregnancy.weanedOn = resource.weanedOn ?? null;
    pregnancy.weaningWeightKg = resource.weaningWeightKg ?? null;
    pregnancy.status = resource.status;
    pregnancy.notes = resource.notes ?? null;
    return pregnancy;
  }

  /**
   * Converts a list of raw pregnancy resources into Pregnancy entities.
   */
  toEntitiesFromResponse(resources: PregnancyResource[]): Pregnancy[] {
    return resources.map(resource => this.toEntityFromResource(resource));
  }
}
