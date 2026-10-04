import { ProfileGateway } from './profile-gateway';
import { ProfileStore } from './profile-store';
import { ProfileDraft } from './profile-draft';

export class ProfileService {
  store: ProfileStore;
  api: ProfileGateway;

  constructor(store: ProfileStore, api: ProfileGateway) {
    this.store = store;
    this.api = api;
  }

  load(): Promise<void> {
    this.store.setLoading(true);

    return this.api.getCurrentProfile()
      .then(user => {
        this.store.setProfile(user);
        this.store.setLoading(false);
      });
  }

  save(draft: ProfileDraft): Promise<void> {
    this.store.setLoading(true);

    return this.api.updateProfile(draft)
      .then(user => {
        this.store.setProfile(user);
        this.store.setLoading(false);
      });
  }

  setPreferences(theme: string, locale: string): Promise<void> {
    const draft = new ProfileDraft();

    if (this.store.profile) {
      draft.fullName = this.store.profile.fullName;
      draft.phone = this.store.profile.phone;
      draft.photoUrl = this.store.profile.photoUrl;
    }

    draft.theme = theme;
    draft.locale = locale;

    return this.save(draft);
  }
}
