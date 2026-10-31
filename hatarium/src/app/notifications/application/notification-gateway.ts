import {Notification} from '../domain/model/notification.entity';


export interface NotificationGateway {
  getNotifications(recipientUserId?: string): Promise<Notification[]>;
  markAsRead(id:string): Promise<Notification>;

}
