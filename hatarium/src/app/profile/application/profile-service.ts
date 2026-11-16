import { ProfileGateway } from './profile-gateway';
import { ProfileStore } from './profile-store';
import { ProfileDraft } from './profile-draft';
import { User } from '../domain/model/user.entity';

export class ProfileService {
  store: ProfileStore;
  api: ProfileGateway;

  constructor(store: ProfileStore, api: ProfileGateway,
              private readonly onSaved?: (user: User) => void,
              private readonly currentProfile?: () => User | null) {
    this.store = store;
    this.api = api;
  }

  async save(draft: ProfileDraft): Promise<void> {
    if (this.store.saving) return;
    this.store.setSaving(true);
    this.store.setError();
    try {
      const user = await this.api.updateProfile(draft);
      this.onSaved?.(user);
    } catch {
      this.store.setError('No se pudo guardar el perfil. Intenta nuevamente.');
    } finally {
      this.store.setSaving(false);
    }
  }

  setPreferences(theme: string, locale: string): Promise<void> {
    const draft = new ProfileDraft();
    const profile = this.currentProfile?.();

    if (!profile) {
      this.store.setError('No se pudo cargar el perfil. Vuelve a intentarlo antes de guardar preferencias.');
      return Promise.resolve();
    }

    draft.fullName = profile.fullName;
    draft.organizationName = profile.organizationName;
    draft.phone = profile.phone;
    draft.photoUrl = profile.photoUrl;

    draft.theme = theme;
    draft.locale = locale;

    return this.save(draft);
  }
}
