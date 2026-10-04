import { ProfileApiMapper } from './profile-api-mapper';
import { User } from '../domain/model/user.entity';
import { ProfileDraft } from '../application/profile-draft';

export class ProfileApiClient {
  private baseURL: string;
  private mapper: ProfileApiMapper;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.mapper = new ProfileApiMapper();
  }

  getCurrentProfile(): Promise<User> {
    return fetch(`${this.baseURL}/users/usr-002`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`No se pudo cargar el perfil (${response.status})`);
        }
        return response.json();
      })
      .then(data => this.mapper.toUser(data));
  }

  updateProfile(draft: ProfileDraft): Promise<User> {
    return fetch(`${this.baseURL}/users/usr-002`, {
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
      .then(data => this.mapper.toUser(data));
  }
}
