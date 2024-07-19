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
  UserPermission,
  ProjectPermisisonParticipant,
} from '../models';
import {UserPermissionRepository} from '../repositories';

export class UserPermissionProjectPermisisonParticipantController {
  constructor(
    @repository(UserPermissionRepository) protected userPermissionRepository: UserPermissionRepository,
  ) { }

  @get('/user-permissions/{id}/project-permisison-participants', {
    responses: {
      '200': {
        description: 'Array of UserPermission has many ProjectPermisisonParticipant',
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
    return this.userPermissionRepository.projectPermisisonParticipants(id).find(filter);
  }

  @post('/user-permissions/{id}/project-permisison-participants', {
    responses: {
      '200': {
        description: 'UserPermission model instance',
        content: {'application/json': {schema: getModelSchemaRef(ProjectPermisisonParticipant)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof UserPermission.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProjectPermisisonParticipant, {
            title: 'NewProjectPermisisonParticipantInUserPermission',
            exclude: ['id'],
            optional: ['userPermissionId']
          }),
        },
      },
    }) projectPermisisonParticipant: Omit<ProjectPermisisonParticipant, 'id'>,
  ): Promise<ProjectPermisisonParticipant> {
    return this.userPermissionRepository.projectPermisisonParticipants(id).create(projectPermisisonParticipant);
  }

  @patch('/user-permissions/{id}/project-permisison-participants', {
    responses: {
      '200': {
        description: 'UserPermission.ProjectPermisisonParticipant PATCH success count',
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
    return this.userPermissionRepository.projectPermisisonParticipants(id).patch(projectPermisisonParticipant, where);
  }

  @del('/user-permissions/{id}/project-permisison-participants', {
    responses: {
      '200': {
        description: 'UserPermission.ProjectPermisisonParticipant DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(ProjectPermisisonParticipant)) where?: Where<ProjectPermisisonParticipant>,
  ): Promise<Count> {
    return this.userPermissionRepository.projectPermisisonParticipants(id).delete(where);
  }
}
