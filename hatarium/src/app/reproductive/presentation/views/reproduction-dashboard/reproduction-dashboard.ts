import { ChangeDetectionStrategy, Component, OnInit, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReproductiveStore } from '../../../application/reproductive.store';

/**
 * Main dashboard of the reproductive bounded context.
 */
@Component({
  selector: 'app-reproduction-dashboard',
  imports: [RouterLink, TranslatePipe, MatButtonModule, MatIconModule],
  templateUrl: './reproduction-dashboard.html',
  styleUrl: './reproduction-dashboard.css',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class ReproductionDashboard implements OnInit {
  protected readonly store = inject(ReproductiveStore);
  private readonly translate = inject(TranslateService);

  protected readonly reproductiveChartBackground = computed(() => {
    const summary = this.store.summary();
    const total = summary.reproductiveFemales;
    if (total === 0) return '#c8d8cc';

    const pregnantEnd = (summary.statusDistribution.pregnant / total) * 100;
    const vacantEnd = pregnantEnd + (summary.statusDistribution.vacant / total) * 100;
    const inHeatEnd = vacantEnd + (summary.statusDistribution.inHeat / total) * 100;

    return `conic-gradient(
      #168a58 0% ${pregnantEnd}%,
      #83c9a4 ${pregnantEnd}% ${vacantEnd}%,
      #e3a82f ${vacantEnd}% ${inHeatEnd}%,
      #d95b64 ${inHeatEnd}% 100%
    )`;
  });

  ngOnInit(): void {
    this.store.loadSummary();
  }

  protected statusPercentage(value: number): number {
    const total = this.store.summary().reproductiveFemales;
    return total === 0 ? 0 : Math.round((value / total) * 1000) / 10;
  }

  protected formatEventDate(value: string): string {
    const language = this.translate.currentLang() === 'en' ? 'en-US' : 'es-PE';
    return new Intl.DateTimeFormat(language, {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(new Date(`${value}T00:00:00`));
  }
}
