import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageSwitcher } from '../language-switcher/language-switcher';

interface NavOption {
  labelKey: string;
  icon: string;
  link?: string;
}

/**
 * Application layout with a sidenav focused on the reproductive bounded context.
 */
@Component({
  selector: 'app-layout',
  imports: [MatSidenavModule, MatToolbarModule, MatIconModule, MatListModule, RouterOutlet, RouterLink, RouterLinkActive, TranslatePipe, LanguageSwitcher],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
  changeDetection: ChangeDetectionStrategy.Eager
})
export class Layout {
  /** Navigation options shown in the sidenav. Only Reproducción is routed for now. */
  readonly options: NavOption[] = [
    { labelKey: 'sidebar.home', icon: 'home' },
    { labelKey: 'sidebar.livestock', icon: 'pets', link: '/livestock/animals' },
    { labelKey: 'sidebar.health', icon: 'health_and_safety' },
    { labelKey: 'sidebar.reproductive', icon: 'favorite', link: '/reproductive' },
    { labelKey: 'sidebar.feeding', icon: 'restaurant', link: '/livestock/feeding' },
    { labelKey: 'sidebar.lots', icon: 'warehouse' },
    { labelKey: 'sidebar.reports', icon: 'bar_chart' },
    { labelKey: 'sidebar.appointments', icon: 'event' },
    { labelKey: 'sidebar.alerts', icon: 'notifications' },
    { labelKey: 'sidebar.profile', icon: 'account_circle', link: '/profile' },
    { labelKey: 'sidebar.payments', icon: 'settings', link: '/config/payments' }
  ];
}
