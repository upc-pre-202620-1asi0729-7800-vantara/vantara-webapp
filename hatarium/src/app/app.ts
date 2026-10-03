import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NotificationBadge} from './notifications/presentation/notification-badge/notification-badge';
import {NotificationCenterView} from './notifications/presentation/notification-center-view/notification-center-view';

@Component({
  imports: [RouterOutlet, NotificationBadge, NotificationCenterView],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('hatarium');
}
