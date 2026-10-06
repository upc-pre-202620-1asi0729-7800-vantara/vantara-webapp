import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-notification-badge',
  imports: [],
  templateUrl: './notification-badge.html',
  styleUrl: './notification-badge.css'
})
export class NotificationBadge {

  @Input() unreadCount: number = 0;

}
