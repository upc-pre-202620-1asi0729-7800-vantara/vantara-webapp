import { computed, signal } from '@angular/core';
import { Notification } from '../domain/model/notification.entity';

export class NotificationStore {
  private readonly notificationsState = signal<Notification[]>([]);
  private readonly selectedTypeState = signal<string | undefined>('');
  private readonly loadingState = signal(false);
  private readonly errorState = signal<string | undefined>(undefined);
  readonly unreadOnly = signal(false);

  get notifications(): Notification[] { return this.notificationsState(); }
  get selectedType(): string | undefined { return this.selectedTypeState(); }
  set selectedType(type: string | undefined) { this.selectedTypeState.set(type); }
  get loading(): boolean { return this.loadingState(); }
  get errorMessage(): string | undefined { return this.errorState(); }

  setNotifications(values: Notification[]): void {
    this.notificationsState.set([...values].sort((first, second) =>
      (second.sentAt || second.createdAt || '').localeCompare(first.sentAt || first.createdAt || '')));
  }

  replaceNotification(value: Notification): void {
    this.notificationsState.update(notifications => notifications.map(notification =>
      notification.id === value.id ? value : notification
    ));
  }

  readonly visibleNotifications = computed(() => {
    return this.notifications.filter(notification =>
      (!this.selectedType || (this.selectedType === 'REMINDERS'
        ? ['APPOINTMENT_REMINDER', 'VACCINE_REMINDER'].includes(notification.type)
        : notification.type === this.selectedType)) &&
      (!this.unreadOnly() || !notification.isRead()));
  });

  readonly unreadCount = computed(() => {
    return this.notifications.filter(notification =>
      !notification.isRead()
    ).length;
  });

  setLoading(value: boolean): void {
    this.loadingState.set(value);
  }

  setError(message?: string): void {
    this.errorState.set(message);
  }
}
