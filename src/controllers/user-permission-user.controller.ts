import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  UserPermission,
  User,
} from '../models';
import {UserPermissionRepository} from '../repositories';

export class UserPermissionUserController {
  constructor(
    @repository(UserPermissionRepository)
    public userPermissionRepository: UserPermissionRepository,
  ) { }

  @get('/user-permissions/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to UserPermission',
        content: {
          'application/json': {
            schema: getModelSchemaRef(User),
          },
        },
      },
    },
  })
  async getUser(
    @param.path.string('id') id: typeof UserPermission.prototype.id,
  ): Promise<User> {
    return this.userPermissionRepository.user(id);
  }
}
