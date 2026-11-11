import { Component, OnInit, inject } from '@angular/core';

import { NotificationBadge } from '../notification-badge/notification-badge';
import { NotificationList } from '../notification-list/notification-list';

import { NotificationStore } from '../../application/Notification-Store';
import { NotificationService } from '../../application/notification-service';
import { NotificationApiClient } from '../../infrastructure/notification-api-client';
import { environment } from '../../../../environments/environment';
import { TranslatePipe } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { SessionProfile } from '../../../shared/application/session-profile';

@Component({
  selector: 'app-notification-center-view',
  imports: [
    NotificationBadge,
    NotificationList,
    TranslatePipe,
    MatIconModule
  ],
  templateUrl: './notification-center-view.html',
  styleUrl: './notification-center-view.css'
})
export class NotificationCenterView implements OnInit {

  store: NotificationStore;

  service: NotificationService;
  session: SessionProfile;
  readonly filters = [
    { type: '', key: 'notifications.all', icon: 'inbox' },
    { type: 'CALVING_REGISTERED', key: 'notifications.births', icon: 'child_care' },
    { type: 'FEEDING_REGISTERED', key: 'notifications.feeding', icon: 'grass' },
    { type: 'ANIMAL_REGISTERED', key: 'notifications.animals', icon: 'pets' },
    { type: 'HEALTH_ALERT', key: 'notifications.health', icon: 'health_and_safety' },
    { type: 'REMINDERS', key: 'notifications.reminders', icon: 'event' },
  ];

  constructor() {

    this.store = new NotificationStore();

    const api = new NotificationApiClient(
      environment.hatariumApiBaseUrl
    );

    this.service = new NotificationService(
      this.store,
      api
    );

    this.session = inject(SessionProfile);
  }

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.session.roleReady.then(() => {
      this.service.load(this.session.user()?.id)
        .catch(() => {
          this.store.setLoading(false);
          this.store.setError('No se pudieron cargar las notificaciones');
        });
    });
  }

  markAsRead(id: string): void {

    this.service.markAsRead(id)
      .catch(() => {
        this.store.setError(
          'No se pudo actualizar la notificación'
        );
      });

  }

  filterByType(type: string): void {

    if (type === '') {
      this.service.filterByType(undefined);
      return;
    }

    this.service.filterByType(type);

  }

}
