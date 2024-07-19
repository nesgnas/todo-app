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
  Permission,
  AccessControl,
} from '../models';
import {PermissionRepository} from '../repositories';

export class PermissionAccessControlController {
  constructor(
    @repository(PermissionRepository) protected permissionRepository: PermissionRepository,
  ) { }

  @get('/permissions/{id}/access-controls', {
    responses: {
      '200': {
        description: 'Array of Permission has many AccessControl',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(AccessControl)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<AccessControl>,
  ): Promise<AccessControl[]> {
    return this.permissionRepository.accessControls(id).find(filter);
  }

  @post('/permissions/{id}/access-controls', {
    responses: {
      '200': {
        description: 'Permission model instance',
        content: {'application/json': {schema: getModelSchemaRef(AccessControl)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Permission.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AccessControl, {
            title: 'NewAccessControlInPermission',
            exclude: ['id'],
            optional: ['permissionId']
          }),
        },
      },
    }) accessControl: Omit<AccessControl, 'id'>,
  ): Promise<AccessControl> {
    return this.permissionRepository.accessControls(id).create(accessControl);
  }

  @patch('/permissions/{id}/access-controls', {
    responses: {
      '200': {
        description: 'Permission.AccessControl PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AccessControl, {partial: true}),
        },
      },
    })
    accessControl: Partial<AccessControl>,
    @param.query.object('where', getWhereSchemaFor(AccessControl)) where?: Where<AccessControl>,
  ): Promise<Count> {
    return this.permissionRepository.accessControls(id).patch(accessControl, where);
  }

  @del('/permissions/{id}/access-controls', {
    responses: {
      '200': {
        description: 'Permission.AccessControl DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(AccessControl)) where?: Where<AccessControl>,
  ): Promise<Count> {
    return this.permissionRepository.accessControls(id).delete(where);
  }
}
