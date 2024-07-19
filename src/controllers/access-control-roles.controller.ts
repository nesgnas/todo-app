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
  Roles,
} from '../models';
import {AccessControlRepository} from '../repositories';

export class AccessControlRolesController {
  constructor(
    @repository(AccessControlRepository)
    public accessControlRepository: AccessControlRepository,
  ) { }

  @get('/access-controls/{id}/roles', {
    responses: {
      '200': {
        description: 'Roles belonging to AccessControl',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Roles),
          },
        },
      },
    },
  })
  async getRoles(
    @param.path.string('id') id: typeof AccessControl.prototype.id,
  ): Promise<Roles> {
    return this.accessControlRepository.roles(id);
  }
}
