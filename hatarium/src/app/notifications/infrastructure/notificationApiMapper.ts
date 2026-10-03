import { Notification } from '../domain/model/notification.entity';

export class NotificationApiMapper {

  toNotification(payload: unknown): Notification {
    const data = payload as Partial<Notification>;

    const notification = new Notification();

    notification.id = data.id ?? '';
    notification.recipientUserId = data.recipientUserId ?? '';
    notification.type = data.type ?? '';
    notification.title = data.title ?? '';
    notification.description = data.description ?? '';
    notification.channel = data.channel ?? '';
    notification.status = data.status ?? '';

    notification.scheduledAt = data.scheduledAt ?? null;
    notification.sentAt = data.sentAt ?? '';
    notification.readAt = data.readAt ?? null;

    notification.relatedEntityType = data.relatedEntityType ?? '';
    notification.relatedEntityId = data.relatedEntityId ?? '';
    notification.createdAt = data.createdAt ?? '';

    return notification;
  }
}
