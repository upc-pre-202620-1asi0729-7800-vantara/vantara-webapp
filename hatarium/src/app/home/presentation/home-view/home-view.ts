import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { UpperCasePipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { environment } from '../../../../environments/environment';
import { SessionProfile } from '../../../shared/application/session-profile';

interface Counts {
  animals: number;
  lots: number;
  appointments: number;
  alerts: number;
}

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  type: string;
  status: string;
  sentAt: string;
}

/**
 * Home dashboard summarizing the state across bounded contexts.
 * Fetches directly from the same endpoints the other contexts use,
 * so the numbers react to changes made anywhere in the app.
 */
@Component({
  selector: 'app-home-view',
  imports: [MatCardModule, MatButtonModule, MatIconModule, RouterLink, TranslatePipe, UpperCasePipe],
  templateUrl: './home-view.html',
  styleUrl: './home-view.css',
  changeDetection: ChangeDetectionStrategy.Eager
})
export class HomeView implements OnInit {
  private readonly http = inject(HttpClient);
  private readonly session = inject(SessionProfile);

  readonly userName = this.session.fullName;
  readonly counts = signal<Counts>({ animals: 0, lots: 0, appointments: 0, alerts: 0 });
  readonly activity = signal<NotificationItem[]>([]);
  readonly openHealthAlerts = signal<NotificationItem[]>([]);
  readonly loading = signal(true);

  ngOnInit(): void {
    this.load();
  }

  private load(): void {
    const base = environment.hatariumApiBaseUrl;
    this.http.get<unknown[]>(`${base}/animals`).subscribe(a => {
      this.counts.update(c => ({ ...c, animals: a.length }));
    });
    this.http.get<unknown[]>(`${base}/lots`).subscribe(l => {
      this.counts.update(c => ({ ...c, lots: l.length }));
    });
    this.http.get<unknown[]>(`${base}/appointments`).subscribe(a => {
      this.counts.update(c => ({ ...c, appointments: a.length }));
    });
    this.http.get<NotificationItem[]>(`${base}/notifications`).subscribe(list => {
      const unread = list.filter(n => n.status === 'unread').length;
      this.counts.update(c => ({ ...c, alerts: unread }));
      this.openHealthAlerts.set(
        list
          .filter(n => n.type === 'HEALTH_ALERT' && n.status === 'unread')
          .sort((a, b) => b.sentAt.localeCompare(a.sentAt))
      );
      this.activity.set(
        [...list].sort((a, b) => b.sentAt.localeCompare(a.sentAt)).slice(0, 5)
      );
      this.loading.set(false);
    });
  }
}
