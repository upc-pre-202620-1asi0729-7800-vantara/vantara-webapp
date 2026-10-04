import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

interface NavOption {
  label: string;
  icon: string;
  link?: string;
}

/**
 * Application layout with a sidenav focused on the reproductive bounded context.
 */
@Component({
  selector: 'app-layout',
  imports: [MatSidenavModule, MatToolbarModule, MatIconModule, MatListModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
  changeDetection: ChangeDetectionStrategy.Eager
})
export class Layout {
  /** Navigation options shown in the sidenav. Only Reproducción is routed for now. */
  readonly options: NavOption[] = [
    { label: 'Inicio', icon: 'home' },
    { label: 'Ganado', icon: 'pets' },
    { label: 'Salud', icon: 'health_and_safety' },
    { label: 'Reproducción', icon: 'favorite', link: '/reproductive' },
    { label: 'Alimentación', icon: 'restaurant' },
    { label: 'Lotes', icon: 'warehouse' },
    { label: 'Reportes', icon: 'bar_chart' },
    { label: 'Citas', icon: 'event' },
    { label: 'Alertas', icon: 'notifications' }
  ];
}
