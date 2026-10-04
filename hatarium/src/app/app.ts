import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  ClinicalHistoryComponent
} from './veterinary-and-health/presentation/components/clinical-history/clinical-history';

@Component({
  imports: [RouterOutlet, ClinicalHistoryComponent],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('hatarium');
}
