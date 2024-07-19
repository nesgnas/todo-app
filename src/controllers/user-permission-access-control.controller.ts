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
  AccessControl,
} from '../models';
import {UserPermissionRepository} from '../repositories';

export class UserPermissionAccessControlController {
  constructor(
    @repository(UserPermissionRepository)
    public userPermissionRepository: UserPermissionRepository,
  ) { }

  @get('/user-permissions/{id}/access-control', {
    responses: {
      '200': {
        description: 'AccessControl belonging to UserPermission',
        content: {
          'application/json': {
            schema: getModelSchemaRef(AccessControl),
          },
        },
      },
    },
  })
  async getAccessControl(
    @param.path.string('id') id: typeof UserPermission.prototype.id,
  ): Promise<AccessControl> {
    return this.userPermissionRepository.accessControl(id);
  }
}
