import { Service } from '@angular/core';
import { FeedingLog } from '../domain/model/feeding-log.entity';
import {
  FeedingLogResource,
  FeedingLogsResponse
} from './feeding-logs-response';

@Service()
export class FeedingLogAssembler {

  toEntityFromResource(resource: FeedingLogResource): FeedingLog {

    let feedingLog = new FeedingLog();

    feedingLog.id = resource.id;
    feedingLog.planItemId = resource.planItemId;
    feedingLog.animalId = resource.animalId;
    feedingLog.lotId = resource.lotId;
    feedingLog.feedName = resource.feedName;
    feedingLog.feedAt = resource.feedAt;
    feedingLog.quantity = Number(resource.quantity);
    feedingLog.unit = resource.unit;
    feedingLog.recordedBy = resource.recordedBy;
    feedingLog.notes = resource.notes;

    return feedingLog;
  }

  toEntitiesFromResponse(
    response: FeedingLogsResponse
  ): FeedingLog[] {

    return response.feedingLogs.map((resource) =>
      this.toEntityFromResource(resource)
    );
  }
}
