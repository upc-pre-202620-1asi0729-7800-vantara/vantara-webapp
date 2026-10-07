import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Notification } from '../../domain/model/notification.entity';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-notification-item',
  imports: [TranslatePipe, MatIconModule, RouterLink],
  templateUrl: './notification-item.html',
  styleUrl: './notification-item.css'
})
export class NotificationItem {

  @Input() notification!: Notification;

  @Output() read = new EventEmitter<string>();

  get icon(): string {
    return ({ CALVING_REGISTERED: 'child_care', ANIMAL_REGISTERED: 'pets',
      FEEDING_REGISTERED: 'grass', HEALTH_ALERT: 'health_and_safety',
      APPOINTMENT_REMINDER: 'event', VACCINE_REMINDER: 'vaccines' } as Record<string, string>)[this.notification.type] ?? 'notifications';
  }

  get categoryKey(): string {
    return ({ CALVING_REGISTERED: 'births', ANIMAL_REGISTERED: 'animals', FEEDING_REGISTERED: 'feeding',
      HEALTH_ALERT: 'health', APPOINTMENT_REMINDER: 'reminders', VACCINE_REMINDER: 'reminders' } as Record<string, string>)[this.notification.type] ?? 'activity';
  }

  get relatedLink(): string[] | null {
    const id = this.notification.relatedEntityId;
    if (!id) return null;
    switch (this.notification.relatedEntityType) {
      case 'Animal': return ['/livestock/animals', id];
      case 'Pregnancy': return ['/reproductive'];
      case 'FeedingPlan': return ['/livestock/feeding', id];
      case 'Appointment': return ['/veterinary/appointments', id];
      default: return null;
    }
  }

  markAsRead(): void {
    this.read.emit(this.notification.id);
  }

}
