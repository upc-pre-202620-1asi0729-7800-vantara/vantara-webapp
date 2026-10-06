import { NotificationGateway } from './notification-gateway';
import { NotificationStore } from './Notification-Store';

export class NotificationService {
  store: NotificationStore;
  api: NotificationGateway;

  constructor(store: NotificationStore, api: NotificationGateway) {
    this.store = store;
    this.api = api;
  }

  async load(): Promise<void> {
    this.store.setLoading(true);
    this.store.setError();
    try {
      this.store.setNotifications(await this.api.getNotifications());
    } finally {
      this.store.setLoading(false);
    }
  }

  refresh(): Promise<void> {
    return this.load();
  }

  markAsRead(id: string): Promise<void> {
    this.store.setError();
    return this.api.markAsRead(id)
      .then(notification => {
        this.store.replaceNotification(notification);
      });
  }

  filterByType(type?: string): void {
    this.store.selectedType = type;
  }
}
