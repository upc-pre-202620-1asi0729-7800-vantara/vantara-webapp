import { Service } from '@angular/core';
import { FeedingPlan } from '../domain/model/feeding-plan.entity';
import { FeedingPlanItem } from '../domain/model/feeding-plan-item.entity';
import {
  FeedingPlanResource,
  FeedingPlansResponse
} from './feeding-plans-response';

@Service()
export class FeedingPlanAssembler {

  toEntityFromResource(resource: FeedingPlanResource): FeedingPlan {
    let feedingPlan = new FeedingPlan();

    feedingPlan.id = resource.id;
    feedingPlan.lotId = resource.lotId;
    feedingPlan.animalId = resource.animalId;
    feedingPlan.name = resource.name;
    feedingPlan.startsOn = resource.startsOn;
    feedingPlan.endsOn = resource.endsOn;
    feedingPlan.objective = resource.objective;
    feedingPlan.currentAverageWeight = resource.currentAverageWeight;
    feedingPlan.targetWeight = resource.targetWeight;
    feedingPlan.frequency = resource.frequency;
    feedingPlan.daysOfWeek = resource.daysOfWeek;
    feedingPlan.schedules = resource.schedules;
    feedingPlan.instructions = resource.instructions;
    feedingPlan.status = resource.status;
    feedingPlan.items = (resource.items ?? []).map(item => Object.assign(new FeedingPlanItem(), {
      id: item.id,
      feedingPlanId: resource.id,
      feedName: item.feedName,
      dailyQuantity: Number(item.dailyQuantity) || 0,
      unit: item.unit,
    }));

    return feedingPlan;
  }

  toEntitiesFromResponse(response: FeedingPlansResponse): FeedingPlan[] {
    return response.feedingPlans.map((resource) =>
      this.toEntityFromResource(resource)
    );
  }
}
