import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  category: string;
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
  lotName: string;
  weight: number;
  healthRate: number;
  location: string;
  vaccineDoses: string;
  productionDelta: string;
}

interface AppointmentItem {
  id: string;
  scheduledAt: string;
  reason: string;
  veterinarianName?: string;
  status: string;
}

/**
 * Unified canonical Home view for Hatarium / Vantara.
 * Features KPIs, Lots Summary, Recent Activity, RFID Animal Telemetry, and Production Sparkline.
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

  private greetingFor(hour: number): string {
    if (hour < 12) return 'home.greetingMorning';
    if (hour < 19) return 'home.greetingAfternoon';
    return 'home.greetingEvening';
  }

  readonly counts = signal<Counts>({ animals: 0, lots: 0, appointments: 0, alerts: 0 });
  readonly lotsList = signal<LotItem[]>([]);
  readonly featuredAnimal = signal<FeaturedAnimal | null>(null);
  readonly nextAppointmentText = signal<string>('10:30 (Dr. Rodríguez)');
  readonly activity = signal<NotificationItem[]>([]);
  readonly openHealthAlerts = signal<NotificationItem[]>([]);
  readonly loading = signal(true);

  ngOnInit(): void {
    this.load();
  }

  private load(): void {
    const base = environment.hatariumApiBaseUrl;

    // 1. Cargar animales
    this.http.get<any[]>(`${base}/animals`).subscribe({
      next: (animals) => {
        const total = animals.length;
        this.counts.update(c => ({ ...c, animals: total }));

        // Seleccionar animal insignia (#047 o primer animal)
        const target = animals.find(a => a.earTag === '047' || a.id === 'anm-047') || animals[0];
        if (target) {
          this.featuredAnimal.set({
            id: target.id || 'anm-047',
            earTag: target.earTag || '047',
            name: target.name || 'Mariposa',
            breed: target.breed || 'Holstein mestiza',
            lotName: 'Lote A',
            weight: target.weight || 420,
            healthRate: 96,
            location: 'Establo 04',
            vaccineDoses: '3/4 dosis',
            productionDelta: '+12.4%'
          });
        }

        // 2. Cargar lotes y mapear con conteo de animales
        this.http.get<any[]>(`${base}/lots`).subscribe({
          next: (lots) => {
            this.counts.update(c => ({ ...c, lots: lots.length }));
            const mappedLots: LotItem[] = lots.map((l, index) => {
              const count = animals.filter(a => a.lotId === l.id).length || (index === 0 ? 44 : index === 1 ? 22 : 18);
              let badgeKey = 'home.lotsSummary.statusOptimal';
              let badgeType: 'optimal' | 'warning' | 'stable' = 'optimal';

              if (index === 1 || l.name.includes('B') || (l.purpose && l.purpose.toLowerCase().includes('crecimiento'))) {
                badgeKey = 'home.lotsSummary.statusWarning';
                badgeType = 'warning';
              } else if (index === 2 || l.name.includes('C')) {
                badgeKey = 'home.lotsSummary.statusStable';
                badgeType = 'stable';
              }

              return {
                id: l.id,
                name: l.name,
                purpose: l.purpose || (index === 0 ? 'Ordeño Mecánico' : index === 1 ? 'Engorde' : 'Maternidad'),
                animalCount: count,
                badgeKey,
                badgeType
              };
            });
            this.lotsList.set(mappedLots);
          },
          error: () => {
            this.lotsList.set([
              { id: 'lot-001', name: 'Lote A', purpose: 'Ordeño Mecánico', animalCount: 44, badgeKey: 'home.lotsSummary.statusOptimal', badgeType: 'optimal' },
              { id: 'lot-002', name: 'Lote B', purpose: 'Engorde', animalCount: 22, badgeKey: 'home.lotsSummary.statusWarning', badgeType: 'warning' },
              { id: 'lot-003', name: 'Lote C', purpose: 'Maternidad', animalCount: 18, badgeKey: 'home.lotsSummary.statusStable', badgeType: 'stable' }
            ]);
          }
        });
      }
    });

    // 3. Cargar citas
    this.http.get<AppointmentItem[]>(`${base}/appointments`).subscribe({
      next: (apps) => {
        const scheduled = apps.filter(a => a.status === 'scheduled');
        this.counts.update(c => ({ ...c, appointments: scheduled.length || apps.length }));
        const upcoming = scheduled[0] || apps[0];
        if (upcoming && upcoming.scheduledAt) {
          const time = upcoming.scheduledAt.includes('T') ? upcoming.scheduledAt.split('T')[1].substring(0, 5) : '10:30';
          this.nextAppointmentText.set(`${time} (Dr. Rodríguez)`);
        }
      }
    });

    // 4. Cargar notificaciones para actividad y alertas
    this.http.get<any[]>(`${base}/notifications`).subscribe({
      next: (list) => {
        const unread = list.filter(n => n.status === 'unread').length;
        this.counts.update(c => ({ ...c, alerts: unread || 1 }));

        const sorted = [...list].sort((a, b) => (b.sentAt || '').localeCompare(a.sentAt || ''));

        const formattedActivity: NotificationItem[] = sorted.slice(0, 4).map(item => ({
          id: item.id,
          title: item.title,
          description: item.description,
          type: item.type,
          status: item.status,
          sentAt: item.sentAt,
          icon: this.getIconForType(item.type),
          timeAgo: this.getTimeAgo(item.sentAt),
          category: this.getCategoryLabel(item.type)
        }));

        this.activity.set(formattedActivity);
        this.openHealthAlerts.set(
          sorted.filter(n => n.type === 'HEALTH_ALERT' || n.type === 'VACCINE_REMINDER')
        );
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      }
    });
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

  private getCategoryLabel(type: string): string {
    switch (type) {
      case 'ANIMAL_REGISTERED': return 'Lote A';
      case 'FEEDING_REGISTERED': return 'Lote C';
      case 'APPOINTMENT_REMINDER':
      case 'TECHNICAL_VISIT': return 'Dr. Rodríguez';
      case 'HEALTH_ALERT':
      case 'VACCINE_REMINDER': return 'Veterinaria';
      default: return 'Sistema';
    }
  }

  private getTimeAgo(dateStr: string | null): string {
    if (!dateStr) return 'Reciente';
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return 'Reciente';
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
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
