import { ProfileApiMapper } from './profile-api-mapper';
import { User } from '../domain/model/user.entity';
import { ProfileDraft } from '../application/profile-draft';
import { Account } from '../../iam/domain/model/account.entity';

export class ProfileApiClient {
  private baseURL: string;
  private mapper: ProfileApiMapper;

  constructor(baseURL: string, private readonly currentAccount: () => Promise<Account | null>) {
    this.baseURL = baseURL;
    this.mapper = new ProfileApiMapper();
  }

  async getCurrentProfile(): Promise<User> {
    const account = await this.currentAccount();
    if (!account) throw new Error('Inicia sesión para consultar tu perfil.');
    const response = await fetch(`${this.baseURL}/users?accountId=${encodeURIComponent(account.id)}`);
    if (!response.ok) throw new Error('No se pudo cargar el perfil.');
    const users = await response.json() as User[];
    let data = users[0];
    if (!data) {
      // Older registrations did not create a profile or retain the supplied name.
      const created = await fetch(`${this.baseURL}/users`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: `usr-${account.id}`, accountId: account.id,
          fullName: account.email, organizationName: '', phone: '', photoUrl: '', theme: 'light', locale: 'es' }),
      });
      if (!created.ok) throw new Error('No se pudo crear el perfil de esta cuenta.');
      data = await created.json();
    }
    return this.mapper.toUser({ ...data, email: account.email });
  }

  async updateProfile(draft: ProfileDraft): Promise<User> {
    const profile = await this.getCurrentProfile();
    return fetch(`${this.baseURL}/users/${encodeURIComponent(profile.id)}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(draft)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`No se pudo guardar el perfil (${response.status})`);
        }
        return response.json();
      })
      .then(data => this.mapper.toUser({ ...data, email: profile.email }));
  }
}
