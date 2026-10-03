import {Notification} from '../domain/model/notification.entity';


export interface NotificationGateway {
  getNotifications(): Promise<Notification[]>;
  markAsRead(id:string): Promise<Notification>;

}
