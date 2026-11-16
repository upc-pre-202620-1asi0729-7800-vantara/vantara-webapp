import { Account } from '../../iam/domain/model/account.entity';
import { AUTH_TOKEN_STORAGE_KEY } from '../../shared/infrastructure/auth-token.interceptor';
import { ProfileDraft } from '../application/profile-draft';
import { ProfileGateway } from '../application/profile-gateway';
import { User } from '../domain/model/user.entity';
import { ProfileApiMapper } from './profile-api-mapper';

/**
 * Client for `/profile-management/profiles/me` of the real backend.
 * It uses `fetch` instead of HttpClient, so it adds the bearer token itself.
 */
export class ProfileApiClient implements ProfileGateway {
  private readonly profileUrl: string;
  private readonly mapper = new ProfileApiMapper();

  constructor(backendBaseUrl: string, private readonly currentAccount: () => Promise<Account | null>) {
    this.profileUrl = `${backendBaseUrl}/profile-management/profiles/me`;
  }

  async updateProfile(draft: ProfileDraft): Promise<User> {
    const account = await this.requireAccount();
    const response = await fetch(this.profileUrl, {
      method: 'PUT',
      headers: { ...this.headers(), 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: draft.fullName,
        organizationName: draft.organizationName,
        phone: draft.phone ?? '',
        photoUrl: draft.photoUrl ?? '',
        theme: draft.theme,
        locale: draft.locale
      })
    });
    if (!response.ok) throw new Error(`No se pudo guardar el perfil (${response.status}).`);
    return this.mapper.toUser({ ...(await response.json()), email: account.email });
  }

  private async requireAccount(): Promise<Account> {
    const account = await this.currentAccount();
    if (!account) throw new Error('Inicia sesión para consultar tu perfil.');
    return account;
  }

  private headers(): Record<string, string> {
    let token: string | null = null;
    try { token = sessionStorage.getItem(AUTH_TOKEN_STORAGE_KEY); } catch { token = null; }
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
}
