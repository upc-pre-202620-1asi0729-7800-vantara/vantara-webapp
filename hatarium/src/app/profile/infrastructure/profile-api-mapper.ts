import { User } from '../domain/model/user.entity'


export class ProfileApiMapper {

  toUser(payload: unknown): User{
    const data = payload as Partial<User>;
    const user = new User();

    user.id = data.id ?? '';
    user.accountId = data.accountId ?? '';
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
