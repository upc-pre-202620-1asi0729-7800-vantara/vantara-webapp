import { NotificationApiMapper } from './notificationApiMapper';
import { Notification } from '../domain/model/notification.entity'


export class NotificationApiClient {
  private baseUrl: string;
  private mapper: NotificationApiMapper;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.mapper = new NotificationApiMapper();
  }

  getNotifications(): Promise<Notification[]> {
    return fetch(`${this.baseUrl}/notifications`)
      .then(response => response.json())
      .then((data: unknown) => {
        if (!Array.isArray(data)) {
          throw new TypeError('Expected notifications response to be an array');
        }

        return data.map((item: unknown) => this.mapper.toNotification(item));
      });
  }


  markAsRead(id:string): Promise<Notification>{
    return fetch(`${this.baseUrl}/notifications/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        status: 'read',
        readAt: new Date().toISOString()
      })
    })
    .then(response => response.json())
    .then(data => this.mapper.toNotification(data))
  }


}
