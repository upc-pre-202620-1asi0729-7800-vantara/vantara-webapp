import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageSwitcher } from '../language-switcher/language-switcher';
import { IamStore } from '../../../../iam/application/iam.store';
import { environment } from '../../../../../environments/environment';

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
  imports: [MatSidenavModule, MatToolbarModule, MatIconModule, MatListModule, MatButtonModule, RouterOutlet, RouterLink, RouterLinkActive, TranslatePipe, LanguageSwitcher],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
  changeDetection: ChangeDetectionStrategy.Eager
})
export class Layout {
  private readonly iamStore = inject(IamStore);
  private readonly router = inject(Router);
  private readonly http = inject(HttpClient);

  readonly userName = signal('Juan Quispe');
  readonly userRole = signal('Administrador');

  constructor() {
    this.http.get<Array<{ fullName: string }>>(`${environment.hatariumApiBaseUrl}/users`)
      .subscribe(users => {
        if (users.length) this.userName.set(users[0].fullName);
      });
  }

  signOut(): void {
    this.iamStore.signOut();
    void this.router.navigateByUrl('/iam/sign-in');
  }

  /** Navigation options shown in the sidenav. Only Reproducción is routed for now. */
  readonly options: NavOption[] = [
    { labelKey: 'sidebar.home', icon: 'home', link: '/home' },
    { labelKey: 'sidebar.livestock', icon: 'pets', link: '/livestock/animals' },
    { labelKey: 'sidebar.health', icon: 'health_and_safety', link: '/veterinary/appointments' },
    { labelKey: 'sidebar.reproductive', icon: 'favorite', link: '/reproductive' },
    { labelKey: 'sidebar.feeding', icon: 'restaurant', link: '/livestock/feeding' },
    { labelKey: 'sidebar.reports', icon: 'bar_chart' },
    { labelKey: 'sidebar.appointments', icon: 'event' },
    { labelKey: 'sidebar.alerts', icon: 'notifications', link: '/notifications' }
  ];
}
