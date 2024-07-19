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
  Project,
} from '../models';
import {ProjectPermisisonParticipantRepository} from '../repositories';

export class ProjectPermisisonParticipantProjectController {
  constructor(
    @repository(ProjectPermisisonParticipantRepository)
    public projectPermisisonParticipantRepository: ProjectPermisisonParticipantRepository,
  ) { }

  @get('/project-permisison-participants/{id}/project', {
    responses: {
      '200': {
        description: 'Project belonging to ProjectPermisisonParticipant',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Project),
          },
        },
      },
    },
  })
  async getProject(
    @param.path.string('id') id: typeof ProjectPermisisonParticipant.prototype.id,
  ): Promise<Project> {
    return this.projectPermisisonParticipantRepository.project(id);
  }
}
