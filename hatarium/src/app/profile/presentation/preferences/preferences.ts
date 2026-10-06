import { Component, Input, OnChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { User } from '../../domain/model/user.entity';
import { ProfileService } from '../../application/profile-service';

@Component({
  selector: 'app-preferences',
  imports: [FormsModule],
  templateUrl: './preferences.html',
  styleUrl: './preferences.css'
})
export class Preferences implements OnChanges {

  @Input() profile?: User;
  @Input() service!: ProfileService;

  theme: string = 'light';
  locale: string = 'es';

  ngOnChanges(): void {
    if (this.profile) {
      this.theme = this.profile.theme;
      this.locale = this.profile.locale;
    }
  }

  apply(): Promise<void> {
    return this.service.setPreferences(
      this.theme,
      this.locale
    );
  }
}
