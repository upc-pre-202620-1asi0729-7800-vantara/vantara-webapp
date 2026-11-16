import { Service } from '@angular/core';
import { Pregnancy } from '../domain/model/pregnancy.entity';
import { PregnancyResource } from './pregnancies-response';

/**
 * Maps pregnancy resources from the API into Pregnancy domain entities.
 */
@Service()
export class PregnancyAssembler {
  /**
   * Converts a raw pregnancy resource into a Pregnancy entity.
   */
  toEntityFromResource(resource: PregnancyResource): Pregnancy {
    const pregnancy = new Pregnancy();
    pregnancy.id = String(resource.id);
    pregnancy.animalId = resource.animalId;
    pregnancy.calfId = resource.calfId ?? null;
    pregnancy.confirmedOn = resource.confirmedOn;
    pregnancy.expectedCalvingOn = resource.expectedCalvingOn ?? null;
    pregnancy.endedOn = resource.calvedOn ?? null;
    pregnancy.outcome = resource.outcome ?? null;
    pregnancy.birthWeightKg = resource.birthWeightKg == null ? null : String(resource.birthWeightKg);
    pregnancy.dryOffOn = resource.dryOffOn ?? null;
    pregnancy.weanedOn = resource.weanedOn ?? null;
    pregnancy.weaningWeightKg = resource.weaningWeightKg == null ? null : String(resource.weaningWeightKg);
    pregnancy.status = resource.status;
    pregnancy.notes = null;
    return pregnancy;
  }

  /**
   * Converts a list of raw pregnancy resources into Pregnancy entities.
   */
  toEntitiesFromResponse(resources: PregnancyResource[]): Pregnancy[] {
    return resources.map((resource) => this.toEntityFromResource(resource));
  }
}
