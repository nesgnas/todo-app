import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Project,
  ProjectPermisisonParticipant,
} from '../models';
import {ProjectRepository} from '../repositories';

export class ProjectProjectPermisisonParticipantController {
  constructor(
    @repository(ProjectRepository) protected projectRepository: ProjectRepository,
  ) { }

  @get('/projects/{id}/project-permisison-participants', {
    responses: {
      '200': {
        description: 'Array of Project has many ProjectPermisisonParticipant',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ProjectPermisisonParticipant)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<ProjectPermisisonParticipant>,
  ): Promise<ProjectPermisisonParticipant[]> {
    return this.projectRepository.projectPermisisonParticipants(id).find(filter);
  }

  @post('/projects/{id}/project-permisison-participants', {
    responses: {
      '200': {
        description: 'Project model instance',
        content: {'application/json': {schema: getModelSchemaRef(ProjectPermisisonParticipant)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Project.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProjectPermisisonParticipant, {
            title: 'NewProjectPermisisonParticipantInProject',
            exclude: ['id'],
            optional: ['projectId']
          }),
        },
      },
    }) projectPermisisonParticipant: Omit<ProjectPermisisonParticipant, 'id'>,
  ): Promise<ProjectPermisisonParticipant> {
    return this.projectRepository.projectPermisisonParticipants(id).create(projectPermisisonParticipant);
  }

  @patch('/projects/{id}/project-permisison-participants', {
    responses: {
      '200': {
        description: 'Project.ProjectPermisisonParticipant PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProjectPermisisonParticipant, {partial: true}),
        },
      },
    })
    projectPermisisonParticipant: Partial<ProjectPermisisonParticipant>,
    @param.query.object('where', getWhereSchemaFor(ProjectPermisisonParticipant)) where?: Where<ProjectPermisisonParticipant>,
  ): Promise<Count> {
    return this.projectRepository.projectPermisisonParticipants(id).patch(projectPermisisonParticipant, where);
  }

  @del('/projects/{id}/project-permisison-participants', {
    responses: {
      '200': {
        description: 'Project.ProjectPermisisonParticipant DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(ProjectPermisisonParticipant)) where?: Where<ProjectPermisisonParticipant>,
  ): Promise<Count> {
    return this.projectRepository.projectPermisisonParticipants(id).delete(where);
  }
}
