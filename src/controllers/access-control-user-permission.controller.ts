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
  AccessControl,
  UserPermission,
} from '../models';
import {AccessControlRepository} from '../repositories';

export class AccessControlUserPermissionController {
  constructor(
    @repository(AccessControlRepository) protected accessControlRepository: AccessControlRepository,
  ) { }

  @get('/access-controls/{id}/user-permissions', {
    responses: {
      '200': {
        description: 'Array of AccessControl has many UserPermission',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(UserPermission)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<UserPermission>,
  ): Promise<UserPermission[]> {
    return this.accessControlRepository.userPermissions(id).find(filter);
  }

  @post('/access-controls/{id}/user-permissions', {
    responses: {
      '200': {
        description: 'AccessControl model instance',
        content: {'application/json': {schema: getModelSchemaRef(UserPermission)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof AccessControl.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserPermission, {
            title: 'NewUserPermissionInAccessControl',
            exclude: ['id'],
            optional: ['accessControlId']
          }),
        },
      },
    }) userPermission: Omit<UserPermission, 'id'>,
  ): Promise<UserPermission> {
    return this.accessControlRepository.userPermissions(id).create(userPermission);
  }

  @patch('/access-controls/{id}/user-permissions', {
    responses: {
      '200': {
        description: 'AccessControl.UserPermission PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserPermission, {partial: true}),
        },
      },
    })
    userPermission: Partial<UserPermission>,
    @param.query.object('where', getWhereSchemaFor(UserPermission)) where?: Where<UserPermission>,
  ): Promise<Count> {
    return this.accessControlRepository.userPermissions(id).patch(userPermission, where);
  }

  @del('/access-controls/{id}/user-permissions', {
    responses: {
      '200': {
        description: 'AccessControl.UserPermission DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(UserPermission)) where?: Where<UserPermission>,
  ): Promise<Count> {
    return this.accessControlRepository.userPermissions(id).delete(where);
  }
}
