import { Component, Input, OnChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

import { User } from '../../domain/model/user.entity';
import { ProfileDraft } from '../../application/profile-draft';
import { ProfileService } from '../../application/profile-service';

@Component({
  selector: 'app-profile-form',
  imports: [FormsModule, TranslatePipe],
  templateUrl: './profile-form.html',
  styleUrl: './profile-form.css'
})
export class ProfileForm implements OnChanges {

  @Input() profile?: User;
  @Input() service!: ProfileService;

  draft: ProfileDraft = new ProfileDraft();

  ngOnChanges(): void {
    if (this.profile) {
      this.draft.fullName = this.profile.fullName;
      this.draft.phone = this.profile.phone;
      this.draft.photoUrl = this.profile.photoUrl;
      this.draft.theme = this.profile.theme;
      this.draft.locale = this.profile.locale;
    }
  }

  save(): Promise<void> {
    return this.service.save(this.draft);
  }
}
