import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReproductiveStore } from '../../../application/reproductive.store';
import { PregnancyForm } from '../pregnancy-form/pregnancy-form';
import { ReproductiveTimeline } from '../reproductive-timeline/reproductive-timeline';

/**
 * Main view of the reproductive bounded context.
 */
@Component({
  selector: 'app-reproductive-history-view',
  imports: [PregnancyForm, ReproductiveTimeline, MatProgressSpinnerModule],
  templateUrl: './reproductive-history-view.html',
  styleUrl: './reproductive-history-view.css',
  changeDetection: ChangeDetectionStrategy.Eager
})
export class ReproductiveHistoryView implements OnInit {
  protected store = inject(ReproductiveStore);

  ngOnInit(): void {
    this.store.loadHistory();
  }
}
