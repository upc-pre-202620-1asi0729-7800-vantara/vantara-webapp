import { NotificationGateway } from './notification-gateway';
import { NotificationStore } from './Notification-Store';

export class NotificationService {
  store: NotificationStore;
  api: NotificationGateway;

  constructor(store: NotificationStore, api: NotificationGateway) {
    this.store = store;
    this.api = api;
  }

  load(): Promise<void> {
    this.store.setLoading(true);

    return this.api.getNotifications()
      .then(notifications => {
        this.store.setNotifications(notifications);
        this.store.setLoading(false);
      });
  }

  refresh(): Promise<void> {
    return this.load();
  }

  markAsRead(id: string): Promise<void> {
    return this.api.markAsRead(id)
      .then(notification => {
        this.store.replaceNotification(notification);
      });
  }

  filterByType(type?: string): void {
    this.store.selectedType = type;
  }
}
