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
  Roles,
  AccessControl,
} from '../models';
import {RolesRepository} from '../repositories';

export class RolesAccessControlController {
  constructor(
    @repository(RolesRepository) protected rolesRepository: RolesRepository,
  ) { }

  @get('/roles/{id}/access-controls', {
    responses: {
      '200': {
        description: 'Array of Roles has many AccessControl',
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
    return this.rolesRepository.accessControls(id).find(filter);
  }

  @post('/roles/{id}/access-controls', {
    responses: {
      '200': {
        description: 'Roles model instance',
        content: {'application/json': {schema: getModelSchemaRef(AccessControl)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Roles.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AccessControl, {
            title: 'NewAccessControlInRoles',
            exclude: ['id'],
            optional: ['rolesId']
          }),
        },
      },
    }) accessControl: Omit<AccessControl, 'id'>,
  ): Promise<AccessControl> {
    return this.rolesRepository.accessControls(id).create(accessControl);
  }

  @patch('/roles/{id}/access-controls', {
    responses: {
      '200': {
        description: 'Roles.AccessControl PATCH success count',
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
    return this.rolesRepository.accessControls(id).patch(accessControl, where);
  }

  @del('/roles/{id}/access-controls', {
    responses: {
      '200': {
        description: 'Roles.AccessControl DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(AccessControl)) where?: Where<AccessControl>,
  ): Promise<Count> {
    return this.rolesRepository.accessControls(id).delete(where);
  }
}
