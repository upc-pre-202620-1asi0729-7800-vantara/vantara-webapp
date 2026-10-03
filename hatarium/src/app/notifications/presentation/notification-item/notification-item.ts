import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Notification } from '../../domain/model/notification.entity';

@Component({
  selector: 'app-notification-item',
  imports: [],
  templateUrl: './notification-item.html',
  styleUrl: './notification-item.css'
})
export class NotificationItem {

  @Input() notification!: Notification;

  @Output() read = new EventEmitter<string>();

  markAsRead(): void {
    this.read.emit(this.notification.id);
  }

}
