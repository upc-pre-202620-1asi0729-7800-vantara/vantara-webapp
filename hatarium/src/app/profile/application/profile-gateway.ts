import { User } from '../domain/model/user.entity';
import { ProfileDraft } from './profile-draft';

export interface ProfileGateway {
  getCurrentProfile(): Promise<User>;
  updateProfile(draft: ProfileDraft): Promise<User>;
}
