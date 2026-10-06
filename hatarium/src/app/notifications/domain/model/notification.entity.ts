export class Notification {
  id: string;
  recipientUserId: string;
  type: string;
  title: string;
  description: string;
  channel: string;
  status: string;
  scheduledAt: string | null;
  sentAt:string;
  readAt: string | null;
  relatedEntityType: string;
  relatedEntityId: string;
  createdAt: string;

  constructor() {
    this.id = '';
    this.recipientUserId = '';
    this.type = '';
    this.title = '';
    this.description = '';
    this.channel = '';
    this.status = '';
    this.scheduledAt = null;
    this.sentAt = '';
    this.readAt = null;
    this.relatedEntityType = '';
    this.relatedEntityId = '';
    this.createdAt = '';
  }


  isRead():boolean{
    return this.readAt !== null;
  }

  formattedDate():string{
    const fecha =new Date(this.sentAt);
    return fecha.toLocaleDateString();
  }
}


/**
 * "notifications": [
 *     {
 *       "id": "not-001",
 *       "recipientUserId": "usr-002",
 *       "type": "HEALTH_ALERT",
 *       "title": "Animal requiere seguimiento",
 *       "description": "El animal #018 presenta una alerta sanitaria y requiere seguimiento.",
 *       "channel": "in_app",
 *       "status": "unread",
 *       "scheduledAt": null,
 *       "sentAt": "2026-09-06T11:00:00",
 *       "readAt": null,
 *       "relatedEntityType": "Animal",
 *       "relatedEntityId": "anm-018",
 *       "createdAt": "2026-09-06"
 *     }
 *
 * */
