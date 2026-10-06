import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
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
  private translate = inject(TranslateService);

  public currentLang = signal('es');

  public switchLanguage(lang: string): void {
    this.translate.use(lang);
    this.currentLang.set(lang);
  }
}
