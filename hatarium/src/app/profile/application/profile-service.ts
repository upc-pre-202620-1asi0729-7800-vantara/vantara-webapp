import { ProfileGateway } from './profile-gateway';
import { ProfileStore } from './profile-store';
import { ProfileDraft } from './profile-draft';
import { User } from '../domain/model/user.entity';

export class ProfileService {
  store: ProfileStore;
  api: ProfileGateway;

  constructor(store: ProfileStore, api: ProfileGateway,
              private readonly onSaved?: (user: User) => void) {
    this.store = store;
    this.api = api;
  }

  async load(): Promise<void> {
    this.store.setLoading(true);
    this.store.setError();
    try {
      const user = await this.api.getCurrentProfile();
      this.store.setProfile(user);
      this.onSaved?.(user);
    } catch {
      this.store.setError('No se pudo cargar el perfil');
    } finally {
      this.store.setLoading(false);
    }
  }

  async save(draft: ProfileDraft): Promise<void> {
    if (this.store.saving) return;
    this.store.setSaving(true);
    this.store.setError();
    try {
      const user = await this.api.updateProfile(draft);
      this.store.setProfile(user);
      this.onSaved?.(user);
    } catch {
      this.store.setError('No se pudo guardar el perfil. Intenta nuevamente.');
    } finally {
      this.store.setSaving(false);
    }
  }

  setPreferences(theme: string, locale: string): Promise<void> {
    const draft = new ProfileDraft();

    if (this.store.profile) {
      draft.fullName = this.store.profile.fullName;
      draft.organizationName = this.store.profile.organizationName;
      draft.phone = this.store.profile.phone;
      draft.photoUrl = this.store.profile.photoUrl;
    }

    draft.theme = theme;
    draft.locale = locale;

    return this.save(draft);
  }
}
