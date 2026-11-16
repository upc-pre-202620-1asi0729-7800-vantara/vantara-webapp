import { NotificationApiMapper } from './notificationApiMapper';
import { Notification } from '../domain/model/notification.entity'
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { inject } from '@angular/core';
import { environment } from '../../../environments/environment';


export class NotificationApiClient {
  private mapper: NotificationApiMapper;
  private http = inject(HttpClient);

  constructor() {
    this.mapper = new NotificationApiMapper();
  }

  getNotifications(recipientUserId?: string): Promise<Notification[]> {
    void recipientUserId; // The backend scopes notifications to the authenticated token.
    return firstValueFrom(this.http.get<unknown[]>(`${environment.vantaraBackendBaseUrl}/notifications`))
      .then(data => data.map(item => this.mapper.toNotification(item)));
  }


  markAsRead(id:string): Promise<Notification>{
    return firstValueFrom(this.http.patch<unknown>(`${environment.vantaraBackendBaseUrl}/notifications/${id}`, {}))
      .then(data => this.mapper.toNotification(data));
  }


}
