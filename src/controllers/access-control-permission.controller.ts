import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  AccessControl,
  Permission,
} from '../models';
import {AccessControlRepository} from '../repositories';

export class AccessControlPermissionController {
  constructor(
    @repository(AccessControlRepository)
    public accessControlRepository: AccessControlRepository,
  ) { }

  @get('/access-controls/{id}/permission', {
    responses: {
      '200': {
        description: 'Permission belonging to AccessControl',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Permission),
          },
        },
      },
    },
  })
  async getPermission(
    @param.path.string('id') id: typeof AccessControl.prototype.id,
  ): Promise<Permission> {
    return this.accessControlRepository.permission(id);
  }
}
