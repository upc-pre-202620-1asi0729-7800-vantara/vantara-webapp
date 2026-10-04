import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

/**
 * Main dashboard of the reproductive bounded context.
 */
@Component({
  selector: 'app-reproduction-dashboard',
  imports: [RouterLink, MatButtonModule, MatIconModule],
  templateUrl: './reproduction-dashboard.html',
  styleUrl: './reproduction-dashboard.css',
  changeDetection: ChangeDetectionStrategy.Eager
})
export class ReproductionDashboard {}
