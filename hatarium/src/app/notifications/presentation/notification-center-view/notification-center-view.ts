import { Component, OnInit } from '@angular/core';

import { NotificationBadge } from '../notification-badge/notification-badge';
import { NotificationList } from '../notification-list/notification-list';

import { NotificationStore } from '../../application/Notification-Store';
import { NotificationService } from '../../application/notification-service';
import { NotificationApiClient } from '../../infrastructure/notification-api-client';
import { environment } from '../../../../environments/environment';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-notification-center-view',
  imports: [
    NotificationBadge,
    NotificationList,
    TranslatePipe
  ],
  templateUrl: './notification-center-view.html',
  styleUrl: './notification-center-view.css'
})
export class NotificationCenterView implements OnInit {

  store: NotificationStore;

  service: NotificationService;

  constructor() {

    this.store = new NotificationStore();

    const api = new NotificationApiClient(
      environment.hatariumApiBaseUrl
    );

    this.service = new NotificationService(
      this.store,
      api
    );
  }

  ngOnInit(): void {

    this.service.load()
      .catch(() => {
        this.store.setLoading(false);
        this.store.setError(
          'No se pudieron cargar las notificaciones'
        );
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
