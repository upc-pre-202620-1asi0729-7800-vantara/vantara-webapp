import { Service, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface ActivityNotification {
  recipientUserId: string;
  type: 'CALVING_REGISTERED' | 'ANIMAL_REGISTERED' | 'FEEDING_REGISTERED';
  title: string;
  description: string;
  relatedEntityType: string;
  relatedEntityId: string;
}

/** Publishes in-app activity only after its corresponding record was saved. */
@Service()
export class ActivityNotifications {
  private readonly http = inject(HttpClient);
  readonly error = signal<string | null>(null);

  publish(activity: ActivityNotification): Observable<unknown> {
    const now = new Date().toISOString();
    return this.http.post(`${environment.hatariumApiBaseUrl}/notifications`, {
      ...activity,
      id: `not-${activity.type.toLowerCase()}-${activity.relatedEntityId}`,
      channel: 'in_app', status: 'unread', scheduledAt: null,
      sentAt: now, readAt: null, createdAt: now,
    }).pipe(
      tap(() => this.error.set(null)),
      catchError(() => {
        this.error.set('El registro se guardó, pero no se pudo crear su notificación.');
        return of(null);
      }),
    );
  }
}
