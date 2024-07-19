import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  ProjectPermisisonParticipant,
  UserPermission,
} from '../models';
import {ProjectPermisisonParticipantRepository} from '../repositories';

export class ProjectPermisisonParticipantUserPermissionController {
  constructor(
    @repository(ProjectPermisisonParticipantRepository)
    public projectPermisisonParticipantRepository: ProjectPermisisonParticipantRepository,
  ) { }

  @get('/project-permisison-participants/{id}/user-permission', {
    responses: {
      '200': {
        description: 'UserPermission belonging to ProjectPermisisonParticipant',
        content: {
          'application/json': {
            schema: getModelSchemaRef(UserPermission),
          },
        },
      },
    },
  })
  async getUserPermission(
    @param.path.string('id') id: typeof ProjectPermisisonParticipant.prototype.id,
  ): Promise<UserPermission> {
    return this.projectPermisisonParticipantRepository.userPermission(id);
  }
}
