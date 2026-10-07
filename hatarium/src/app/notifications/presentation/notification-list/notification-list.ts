import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Notification } from '../../domain/model/notification.entity';
import { NotificationItem } from '../notification-item/notification-item';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-notification-list',
  imports: [NotificationItem, MatIconModule, TranslatePipe],
  templateUrl: './notification-list.html',
  styleUrl: './notification-list.css'
})
export class NotificationList {

  @Input() notifications: Notification[] = [];

  @Output() markRead = new EventEmitter<string>();

  select(id: string): void {
    this.markRead.emit(id);
  }

}
