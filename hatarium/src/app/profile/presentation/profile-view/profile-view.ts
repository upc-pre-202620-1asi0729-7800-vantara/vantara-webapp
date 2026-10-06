import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { ProfileForm } from '../profile-form/profile-form';
import { Preferences } from '../preferences/preferences';

import { ProfileStore } from '../../application/profile-store';
import { ProfileService } from '../../application/profile-service';
import { ProfileApiClient } from '../../infrastructure/profile-api-client';
import { environment } from '../../../../environments/environment';
import { TranslatePipe } from '@ngx-translate/core';
import { SessionProfile } from '../../../shared/application/session-profile';
import { IamStore } from '../../../iam/application/iam.store';

@Component({
  selector: 'app-profile-view',
  imports: [
    ProfileForm,
    Preferences,
    TranslatePipe
  ],
  templateUrl: './profile-view.html',
  styleUrl: './profile-view.css'
})
export class ProfileView implements OnInit {

  store: ProfileStore;
  service: ProfileService;

  constructor(private readonly changeDetector: ChangeDetectorRef,
              sessionProfile: SessionProfile, iamStore: IamStore) {

    this.store = new ProfileStore();

    const api = new ProfileApiClient(
      environment.hatariumApiBaseUrl,
      async () => { await iamStore.ready; return iamStore.currentAccount(); }
    );

    this.service = new ProfileService(
      this.store,
      api,
      user => sessionProfile.updateUser({
        id: user.id,
        accountId: user.accountId,
        fullName: user.fullName,
        photoUrl: user.photoUrl ?? ''
      })
    );
  }

  ngOnInit(): void {
    this.service.load()
      .then(() => this.changeDetector.markForCheck())
      .catch(() => {
        this.store.setLoading(false);
        this.store.setError(
          'No se pudo cargar el perfil'
        );
        this.changeDetector.markForCheck();
      });
  }
}
