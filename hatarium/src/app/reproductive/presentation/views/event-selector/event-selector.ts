import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

/**
 * View that lets the user pick which reproductive event to register.
 */
@Component({
  selector: 'app-event-selector',
  imports: [RouterLink, TranslatePipe, MatIconModule, MatCardModule],
  templateUrl: './event-selector.html',
  styleUrl: './event-selector.css',
  changeDetection: ChangeDetectionStrategy.Eager
})
export class EventSelector {
  readonly events = [
    { key: 'pregnancy', icon: 'favorite', link: '/reproductive/events/pregnancy' },
    { key: 'calving', icon: 'pets', link: '/reproductive/events/calving' },
    { key: 'dryOff', icon: 'hourglass_empty', link: '/reproductive/events/dry-off' },
    { key: 'weaning', icon: 'child_care', link: '/reproductive/events/weaning' }
  ];
}
