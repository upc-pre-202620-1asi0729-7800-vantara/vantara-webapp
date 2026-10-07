import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { ReportsStore } from '../../../application/reports-store';

@Component({
  selector: 'app-reports-results',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule
  ],
  templateUrl: './reports-results.html',
  styleUrl: './reports-results.css'
})
export class ReportsResults {

  readonly reportsStore = inject(ReportsStore);

  get isLivestockReport(): boolean {
    return this.reportsStore.livestockReport() !== null;
  }

  get isFeedingReport(): boolean {
    return this.reportsStore.feedingReport() !== null;
  }

  goBack(): void {
    window.history.back();
  }

}
