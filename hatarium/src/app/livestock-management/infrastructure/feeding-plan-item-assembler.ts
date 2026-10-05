import { Service } from '@angular/core';
import { FeedingPlanItem } from '../domain/model/feeding-plan-item.entity';
import {
  FeedingPlanItemResource,
  FeedingPlanItemsResponse
} from './feeding-plan-items-response';

@Service()
export class FeedingPlanItemAssembler {

  toEntityFromResource(resource: FeedingPlanItemResource): FeedingPlanItem {
    let item = new FeedingPlanItem();

    item.id = resource.id;
    item.feedingPlanId = resource.feedingPlanId;
    item.feedName = resource.feedName;
    item.dailyQuantity = Number(resource.dailyQuantity);
    item.unit = resource.unit;

    return item;
  }

  toEntitiesFromResponse(response: FeedingPlanItemsResponse): FeedingPlanItem[] {
    return response.feedingPlanItems.map((resource) =>
      this.toEntityFromResource(resource)
    );
  }
}
