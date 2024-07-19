import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {ProjectPermisisonParticipant} from '../models';
import {ProjectPermisisonParticipantRepository} from '../repositories';

export class ProjectPermissionParticipantController {
  constructor(
    @repository(ProjectPermisisonParticipantRepository)
    public projectPermisisonParticipantRepository : ProjectPermisisonParticipantRepository,
  ) {}

  @post('/project-permisison-participants')
  @response(200, {
    description: 'ProjectPermisisonParticipant model instance',
    content: {'application/json': {schema: getModelSchemaRef(ProjectPermisisonParticipant)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProjectPermisisonParticipant, {
            title: 'NewProjectPermisisonParticipant',
            exclude: ['id'],
          }),
        },
      },
    })
    projectPermisisonParticipant: Omit<ProjectPermisisonParticipant, 'id'>,
  ): Promise<ProjectPermisisonParticipant> {
    return this.projectPermisisonParticipantRepository.create(projectPermisisonParticipant);
  }

  @get('/project-permisison-participants/count')
  @response(200, {
    description: 'ProjectPermisisonParticipant model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ProjectPermisisonParticipant) where?: Where<ProjectPermisisonParticipant>,
  ): Promise<Count> {
    return this.projectPermisisonParticipantRepository.count(where);
  }

  @get('/project-permisison-participants')
  @response(200, {
    description: 'Array of ProjectPermisisonParticipant model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ProjectPermisisonParticipant, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ProjectPermisisonParticipant) filter?: Filter<ProjectPermisisonParticipant>,
  ): Promise<ProjectPermisisonParticipant[]> {
    return this.projectPermisisonParticipantRepository.find(filter);
  }

  @patch('/project-permisison-participants')
  @response(200, {
    description: 'ProjectPermisisonParticipant PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProjectPermisisonParticipant, {partial: true}),
        },
      },
    })
    projectPermisisonParticipant: ProjectPermisisonParticipant,
    @param.where(ProjectPermisisonParticipant) where?: Where<ProjectPermisisonParticipant>,
  ): Promise<Count> {
    return this.projectPermisisonParticipantRepository.updateAll(projectPermisisonParticipant, where);
  }

  @get('/project-permisison-participants/{id}')
  @response(200, {
    description: 'ProjectPermisisonParticipant model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ProjectPermisisonParticipant, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(ProjectPermisisonParticipant, {exclude: 'where'}) filter?: FilterExcludingWhere<ProjectPermisisonParticipant>
  ): Promise<ProjectPermisisonParticipant> {
    return this.projectPermisisonParticipantRepository.findById(id, filter);
  }

  @patch('/project-permisison-participants/{id}')
  @response(204, {
    description: 'ProjectPermisisonParticipant PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProjectPermisisonParticipant, {partial: true}),
        },
      },
    })
    projectPermisisonParticipant: ProjectPermisisonParticipant,
  ): Promise<void> {
    await this.projectPermisisonParticipantRepository.updateById(id, projectPermisisonParticipant);
  }

  @put('/project-permisison-participants/{id}')
  @response(204, {
    description: 'ProjectPermisisonParticipant PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() projectPermisisonParticipant: ProjectPermisisonParticipant,
  ): Promise<void> {
    await this.projectPermisisonParticipantRepository.replaceById(id, projectPermisisonParticipant);
  }

  @del('/project-permisison-participants/{id}')
  @response(204, {
    description: 'ProjectPermisisonParticipant DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.projectPermisisonParticipantRepository.deleteById(id);
  }
}
