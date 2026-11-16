import { User } from '../domain/model/user.entity';
import { ProfileDraft } from './profile-draft';

export interface ProfileGateway {
  updateProfile(draft: ProfileDraft): Promise<User>;
}
