import {HttpClient} from '@angular/common/http';
import {BaseApiEndpoint} from '../../shared/infrastructure/base-api-endpoint';
import {User} from '../domain/model/user.entity';
import {UserAssembler} from './user.assembler';
import {UserResource, UsersResponse} from './user.response';
import {environment} from '../../../environments/environment';
import {inject, Service} from '@angular/core';

/** CRUD endpoint client for IAM user profiles. */
@Service()
export class UsersApiEndpoint extends BaseApiEndpoint<User, UserResource, UsersResponse, UserAssembler> {
  constructor() {
    super(
      inject(HttpClient),
      `${environment.serverBasePath}${environment.usersEndpointPath}`,
      inject(UserAssembler)
    );
  }
}
