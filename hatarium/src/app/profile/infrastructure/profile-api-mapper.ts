import { User } from '../domain/model/user.entity'


export class ProfileApiMapper {

  toUser(payload: unknown): User{
    const data = payload as Partial<User> & { id?: string | number; userId?: string | number };
    const user = new User();

    // Backend ids are numeric; the view keeps them as text. The account is the IAM user id.
    user.id = data.id != null ? String(data.id) : '';
    user.accountId = data.userId != null ? String(data.userId) : data.accountId ?? '';
    user.fullName = data.fullName ?? '';
    user.organizationName = data.organizationName ?? '';
    user.email = data.email ?? '';
    user.phone = data.phone ?? '';
    user.photoUrl = data.photoUrl?? '';
    user.theme = data.theme ?? '';
    user.locale = data.locale ?? '';
    return user;
  }
}
