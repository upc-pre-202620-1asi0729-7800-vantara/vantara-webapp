import { Notification } from '../domain/model/notification.entity';

export class NotificationStore {
  notifications: Notification[];
  selectedType?: string;
  loading: boolean;
  errorMessage?: string;

  constructor() {
    this.notifications = [];
    this.loading = false;
    this.selectedType = '';
    this.errorMessage = '';
  }

  setNotifications(values: Notification[]): void {
    this.notifications = values;
  }

  replaceNotification(value: Notification): void {
    this.notifications = this.notifications.map(notification =>
      notification.id === value.id ? value : notification
    );
  }

  visibleNotifications(): Notification[] {
    if (!this.selectedType) {
      return this.notifications;
    }

    return this.notifications.filter(notification =>
      notification.type === this.selectedType
    );
  }

  unreadCount(): number {
    return this.notifications.filter(notification =>
      !notification.isRead()
    ).length;
  }

  setLoading(value: boolean): void {
    this.loading = value;
  }

  setError(message: string): void {
    this.errorMessage = message;
  }
}
