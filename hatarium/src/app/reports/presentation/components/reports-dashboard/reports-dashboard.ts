import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

import { Router } from '@angular/router';
import {ReportsApi} from '../../../infrastructure/reports-api';
import {ReportsStore} from '../../../application/reports-store';
import {LotResource} from '../../../../livestock-management/infrastructure/lots-response';
import {AnimalResource} from '../../../../livestock-management/infrastructure/animals-response';
import {ReportFilter} from '../../../domain/model/report-filter.entity';



@Component({
  selector: 'app-reports-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule
  ],
  templateUrl: './reports-dashboard.html',
  styleUrl: './reports-dashboard.css'
})
export class ReportsDashboard {

  readonly reportsStore = inject(ReportsStore);

  private readonly reportsApi = inject(ReportsApi);

  private readonly router = inject(Router);


  reportType: 'livestock' | 'feeding' = 'livestock';

  filter = new ReportFilter();


  animals: AnimalResource[] = [];

  lots: LotResource[] = [];

  breeds: string[] = [];

  statuses: string[] = [];


  ngOnInit(): void {

    this.loadAnimals();

    this.loadLots();

  }


  private loadAnimals(): void {

    this.reportsApi
      .getAnimals()
      .subscribe(animals => {

        this.animals = animals;

        this.breeds = [
          ...new Set(
            animals
              .map(animal => animal.breed)
              .filter(breed => breed)
          )
        ];

        this.statuses = [
          ...new Set(
            animals
              .map(animal => animal.status)
              .filter(status => status)
          )
        ];

      });

  }


  private loadLots(): void {

    this.reportsApi
      .getLots()
      .subscribe(lots => {

        this.lots = lots;

      });

  }


  generateReport(): void {

    if (this.reportType === 'livestock') {

      this.reportsStore
        .generateLivestockReport(this.filter)
        .subscribe(() => {

          this.router.navigate(['/reports/results']);

        });

      return;
    }


    this.reportsStore
      .generateFeedingReport(this.filter)
      .subscribe(() => {

        this.router.navigate(['/reports/results']);

      });

  }


  clearReport(): void {

    this.filter = new ReportFilter();

    this.reportsStore.clearReports();

  }

}
