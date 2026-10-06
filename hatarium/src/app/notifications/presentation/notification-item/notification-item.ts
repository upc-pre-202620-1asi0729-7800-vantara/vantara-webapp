import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Notification } from '../../domain/model/notification.entity';

@Component({
  selector: 'app-notification-item',
  imports: [TranslatePipe],
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
