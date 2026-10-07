import { Component, Input } from '@angular/core';

import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-notification-badge',
  imports: [TranslatePipe],
  templateUrl: './notification-badge.html',
  styleUrl: './notification-badge.css'
})
export class NotificationBadge {

  @Input() unreadCount: number = 0;

}
