import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { ProfileForm } from '../profile-form/profile-form';
import { Preferences } from '../preferences/preferences';

import { ProfileStore } from '../../application/profile-store';
import { ProfileService } from '../../application/profile-service';
import { ProfileApiClient } from '../../infrastructure/profile-api-client';
import { environment } from '../../../../environments/environment';
import { TranslatePipe } from '@ngx-translate/core';

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

  constructor(private readonly changeDetector: ChangeDetectorRef) {

    this.store = new ProfileStore();

    const api = new ProfileApiClient(
      environment.hatariumApiBaseUrl
    );

    this.service = new ProfileService(
      this.store,
      api
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
