import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { environment } from '../../../../../environments/environment';
import { SessionProfile } from '../../../application/session-profile';

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
  icon: string;
  timeAgo: string;
}

interface LotItem {
  id: string;
  name: string;
  purpose: string;
  animalCount: number;
  badgeKey: string;
  badgeType: 'optimal' | 'warning' | 'stable';
}

interface FeaturedAnimal {
  id: string;
  earTag: string;
  name: string;
  breed: string;
  sex: string;
  lotName: string;
  weight: number;
  healthStatusKey: string;
  vaccineCount: number;
  lastCheck: string;
}

/**
 * Unified canonical Home view for Hatarium / Vantara.
 * Every figure is derived from the json-server collections, so the screen
 * reflects real herd, health, appointment and feeding data.
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    TranslatePipe
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Home implements OnInit {
  private readonly http = inject(HttpClient);
  private readonly session = inject(SessionProfile);

  readonly userName = this.session.fullName;
  readonly greetingKey = signal(this.greetingFor(new Date().getHours()));

  readonly counts = signal<Counts>({ animals: 0, lots: 0, appointments: 0, alerts: 0 });
  readonly lotsList = signal<LotItem[]>([]);
  readonly featuredAnimal = signal<FeaturedAnimal | null>(null);
  readonly nextAppointmentText = signal<string>('');
  readonly activity = signal<NotificationItem[]>([]);
  readonly loading = signal(true);
  readonly bannerLot = signal<LotItem | null>(null);
  readonly healthyPercent = signal<number>(0);
  readonly attentionCount = signal<number>(0);
  readonly feedingStats = signal<{ totalDaily: number; activePlans: number }>({ totalDaily: 0, activePlans: 0 });

  ngOnInit(): void {
    this.load();
  }

  private greetingFor(hour: number): string {
    if (hour < 12) return 'home.greetingMorning';
    if (hour < 19) return 'home.greetingAfternoon';
    return 'home.greetingEvening';
  }

  private load(): void {
    const base = environment.hatariumApiBaseUrl;

    forkJoin({
      animals: this.http.get<any[]>(`${base}/animals`),
      lots: this.http.get<any[]>(`${base}/lots`),
      vaccines: this.http.get<any[]>(`${base}/vaccines`),
      records: this.http.get<any[]>(`${base}/medicalRecords`),
      appointments: this.http.get<any[]>(`${base}/appointments`),
      notifications: this.http.get<any[]>(`${base}/notifications`),
      feedingPlans: this.http.get<any[]>(`${base}/feedingPlans`),
      feedingPlanItems: this.http.get<any[]>(`${base}/feedingPlanItems`),
    }).subscribe({
      next: data => this.buildDashboard(data),
      error: () => this.loading.set(false),
    });
  }

  private buildDashboard(data: {
    animals: any[];
    lots: any[];
    vaccines: any[];
    records: any[];
    appointments: any[];
    notifications: any[];
    feedingPlans: any[];
    feedingPlanItems: any[];
  }): void {
    const { animals, lots, vaccines, records, appointments, notifications, feedingPlans, feedingPlanItems } = data;
    const now = Date.now();

    // 1. Counts.
    this.counts.set({
      animals: animals.length,
      lots: lots.length,
      appointments: appointments.filter(appointment => appointment.status === 'scheduled').length,
      alerts: notifications.filter(notification => notification.status === 'unread').length,
    });

    // 2. Health metrics (attention = follow-up or critical records).
    const attentionAnimalIds = new Set(
      records
        .filter(record =>
          record.healthStatus === 'follow_up'
          || record.healthStatus === 'critical'
          || record.severity === 'high',
        )
        .map(record => record.animalId),
    );
    this.attentionCount.set(attentionAnimalIds.size);
    const total = animals.length || 1;
    this.healthyPercent.set(Math.round(((total - attentionAnimalIds.size) / total) * 100));

    // 3. Featured animal (real telemetry).
    const target = animals.find(animal => animal.earTag === '047' || animal.id === 'anm-047') || animals[0];
    if (target) {
      const lot = lots.find(item => item.id === target.lotId);
      const animalRecords = records
        .filter(record => record.animalId === target.id)
        .sort((first, second) =>
          new Date(second.recordedAt).getTime() - new Date(first.recordedAt).getTime(),
        );
      const latest = animalRecords[0];

      this.featuredAnimal.set({
        id: target.id,
        earTag: target.earTag,
        name: target.name,
        breed: target.breed,
        sex: target.sex,
        lotName: lot?.name || '—',
        weight: target.weight,
        healthStatusKey: this.healthStatusKey(latest),
        vaccineCount: vaccines.filter(vaccine => vaccine.animalId === target.id).length,
        lastCheck: latest ? this.formatDate(latest.recordedAt) : '—',
      });
    }

    // 4. Lot summary (real status).
    const mappedLots: LotItem[] = lots.map(lot => {
      const lotAnimals = animals.filter(animal => animal.lotId === lot.id);
      const needsAttention = lotAnimals.some(animal =>
        attentionAnimalIds.has(animal.id) || this.hasOverdueVaccine(animal.id, vaccines, now),
      );

      return {
        id: lot.id,
        name: lot.name,
        purpose: lot.purpose || '',
        animalCount: lotAnimals.length,
        badgeKey: needsAttention ? 'home.lotsSummary.statusWarning' : 'home.lotsSummary.statusOptimal',
        badgeType: needsAttention ? 'warning' : 'optimal',
      };
    });
    this.lotsList.set(mappedLots);
    this.bannerLot.set(mappedLots.find(lot => lot.badgeType === 'warning') ?? null);

    // 5. Next appointment (real time + reason).
    const upcoming = appointments
      .filter(appointment => appointment.status === 'scheduled')
      .sort((first, second) =>
        new Date(first.scheduledAt).getTime() - new Date(second.scheduledAt).getTime(),
      )[0];
    if (upcoming?.scheduledAt) {
      const time = upcoming.scheduledAt.includes('T')
        ? upcoming.scheduledAt.split('T')[1].substring(0, 5)
        : '';
      const label = time ? `${time} · ${this.truncate(upcoming.reason, 26)}` : this.truncate(upcoming.reason, 26);
      this.nextAppointmentText.set(label);
    }

    // 6. Recent activity from notifications.
    const sorted = [...notifications].sort((first, second) =>
      (second.sentAt || second.createdAt || '').localeCompare(first.sentAt || first.createdAt || ''),
    );
    this.activity.set(sorted.slice(0, 4).map(item => ({
      id: item.id,
      title: item.title,
      description: item.description,
      type: item.type,
      status: item.status,
      sentAt: item.sentAt,
      icon: this.getIconForType(item.type),
      timeAgo: this.getTimeAgo(item.sentAt || item.createdAt),
    })));

    // 7. Feeding totals for the summary card.
    const totalDaily = feedingPlanItems.reduce(
      (sum, item) => sum + (Number(item.dailyQuantity) || 0),
      0,
    );
    this.feedingStats.set({
      totalDaily,
      activePlans: feedingPlans.filter(plan => plan.status === 'active').length,
    });

    this.loading.set(false);
  }

  private healthStatusKey(latest: any): string {
    if (!latest) return 'home.telemetry.noRecords';
    if (latest.healthStatus === 'critical' || latest.severity === 'high') return 'home.telemetry.statusCritical';
    if (latest.healthStatus === 'follow_up' || latest.severity === 'medium') return 'home.telemetry.statusFollowUp';
    return 'home.telemetry.statusHealthy';
  }

  private hasOverdueVaccine(animalId: string, vaccines: any[], now: number): boolean {
    return vaccines.some(vaccine =>
      vaccine.animalId === animalId
      && vaccine.nextDoseAt
      && new Date(vaccine.nextDoseAt).getTime() < now,
    );
  }

  private formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return isNaN(date.getTime())
      ? '—'
      : date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }

  private truncate(text: string, max: number): string {
    if (!text) return '';
    return text.length > max ? `${text.substring(0, max)}…` : text;
  }

  private getIconForType(type: string): string {
    switch (type) {
      case 'ANIMAL_REGISTERED': return 'pets';
      case 'FEEDING_REGISTERED': return 'grass';
      case 'APPOINTMENT_REMINDER':
      case 'TECHNICAL_VISIT': return 'medical_services';
      case 'HEALTH_ALERT':
      case 'VACCINE_REMINDER': return 'vaccines';
      default: return 'notifications';
    }
  }

  private getTimeAgo(dateStr: string | null): string {
    if (!dateStr) return 'Reciente';
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return 'Reciente';
      const now = new Date();
      const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
      if (diffHours < 1) return 'Hace instantes';
      if (diffHours < 24) return `Hace ${diffHours}h`;
      const diffDays = Math.floor(diffHours / 24);
      if (diffDays === 1) return 'Ayer';
      if (diffDays < 7) return `Hace ${diffDays}d`;
      return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' });
    } catch {
      return 'Reciente';
    }
  }
}
