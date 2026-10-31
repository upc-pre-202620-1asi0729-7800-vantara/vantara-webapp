import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageSwitcher } from '../language-switcher/language-switcher';
import { IamStore } from '../../../../iam/application/iam.store';
import { SessionProfile } from '../../../application/session-profile';

interface NavOption {
  labelKey: string;
  icon: string;
  link?: string;
}

/**
 * Application layout with a role-aware sidenav. Ranchers get the herd
 * management navigation while veterinarians get their clinical workspace.
 */
@Component({
  selector: 'app-layout',
  imports: [MatSidenavModule, MatToolbarModule, MatIconModule, MatListModule, MatButtonModule, RouterOutlet, RouterLink, RouterLinkActive, TranslatePipe, LanguageSwitcher],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
  changeDetection: ChangeDetectionStrategy.Eager
})
export class Layout {
  private static readonly RANCHER_OPTIONS: NavOption[] = [
    { labelKey: 'sidebar.home', icon: 'home', link: '/home' },
    { labelKey: 'sidebar.myCattle', icon: 'pets', link: '/livestock/animals' },
    { labelKey: 'sidebar.lots', icon: 'grid_view' },
    { labelKey: 'sidebar.myAppointmentsHealth', icon: 'health_and_safety', link: '/livestock/animals' },
    { labelKey: 'sidebar.feeding', icon: 'restaurant', link: '/livestock/feeding' },
    { labelKey: 'sidebar.reproductive', icon: 'favorite', link: '/reproductive' },
    { labelKey: 'sidebar.myPayments', icon: 'payments', link: '/config/payments' },
    { labelKey: 'sidebar.reports', icon: 'bar_chart', link: '/reports' },
    { labelKey: 'sidebar.alerts', icon: 'notifications', link: '/notifications' }
  ];

  private static readonly VETERINARIAN_OPTIONS: NavOption[] = [
    { labelKey: 'sidebar.vetDashboard', icon: 'home', link: '/veterinary/dashboard' },
    { labelKey: 'sidebar.vetAppointments', icon: 'event', link: '/veterinary/appointments' },
    { labelKey: 'sidebar.vetRecords', icon: 'assignment', link: '/veterinary/records' },
    { labelKey: 'sidebar.vetProfile', icon: 'person', link: '/profile' }
  ];

  private readonly iamStore = inject(IamStore);
  private readonly router = inject(Router);
  private readonly session = inject(SessionProfile);

  readonly userName = this.session.fullName;
  readonly userRole = this.session.roleName;
  readonly initials = this.session.initials;
  readonly photoUrl = this.session.photoUrl;
  readonly isVeterinarian = this.session.isVeterinarian;
  readonly taglineKey = computed(() => this.isVeterinarian() ? 'sidebar.vetTagline' : 'sidebar.tagline');

  /** Navigation options shown in the sidenav, resolved from the signed-in role. */
  readonly options = computed<NavOption[]>(() =>
    this.isVeterinarian()
      ? Layout.VETERINARIAN_OPTIONS
      : Layout.RANCHER_OPTIONS
  );

  signOut(): void {
    this.iamStore.signOut();
    void this.router.navigateByUrl('/iam/sign-in');
  }
}
