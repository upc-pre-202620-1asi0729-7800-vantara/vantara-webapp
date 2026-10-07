import { Component, inject } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { TranslateService } from '@ngx-translate/core';

/**
 * Switches the active locale used by the translation service.
 */
@Component({
  selector: 'app-language-switcher',
  imports: [MatButtonToggleModule],
  templateUrl: './language-switcher.html',
  styleUrl: './language-switcher.css'
})
export class LanguageSwitcher {
  protected currentLang: string = 'es';
  protected languages: string[] = ['es', 'en'];
  private translate = inject(TranslateService);

  /**
   * Changes the application's current language.
   */
  useLanguage(language: string): void {
    this.translate.use(language);
    this.currentLang = language;
  }
}
