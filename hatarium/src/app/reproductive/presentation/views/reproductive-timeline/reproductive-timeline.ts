import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { Pregnancy } from '../../../domain/model/pregnancy.entity';

/**
 * Presentation component that renders the pregnancy timeline.
 */
@Component({
  selector: 'app-reproductive-timeline',
  imports: [MatCardModule, MatListModule],
  templateUrl: './reproductive-timeline.html',
  styleUrl: './reproductive-timeline.css',
  changeDetection: ChangeDetectionStrategy.Eager
})
export class ReproductiveTimeline {
  /** Pregnancies to display in the timeline. */
  pregnancies = input.required<Pregnancy[]>();
}
