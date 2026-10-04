import {BaseAssembler} from '../../shared/infrastructure/base-assembler';
import {User} from '../domain/model/user.entity';
import {UserResource, UsersResponse} from './user.response';
import {Service} from '@angular/core';

/** Maps User profile entities to and from API resources. */
@Service()
export class UserAssembler implements BaseAssembler<User, UserResource, UsersResponse> {
  toEntityFromResource(resource: UserResource): User {
    return new User(resource);
  }

  toResourceFromEntity(entity: User): UserResource {
    return {
      id: entity.id,
      accountId: entity.accountId,
      fullName: entity.fullName,
      phone: entity.phone,
      photoUrl: entity.photoUrl,
      theme: entity.theme,
      locale: entity.locale
    };
  }

  toEntitiesFromResponse(response: UsersResponse): User[] {
    return response.users.map(resource => this.toEntityFromResource(resource));
  }
}
