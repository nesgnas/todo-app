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
import {AccessControl} from '../models';
import {AccessControlRepository} from '../repositories';

export class AccessControlController {
  constructor(
    @repository(AccessControlRepository)
    public accessControlRepository : AccessControlRepository,
  ) {}

  @post('/access-controls')
  @response(200, {
    description: 'AccessControl model instance',
    content: {'application/json': {schema: getModelSchemaRef(AccessControl)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AccessControl, {
            title: 'NewAccessControl',
            exclude: ['id'],
          }),
        },
      },
    })
    accessControl: Omit<AccessControl, 'id'>,
  ): Promise<AccessControl> {
    return this.accessControlRepository.create(accessControl);
  }

  @get('/access-controls/count')
  @response(200, {
    description: 'AccessControl model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(AccessControl) where?: Where<AccessControl>,
  ): Promise<Count> {
    return this.accessControlRepository.count(where);
  }

  @get('/access-controls')
  @response(200, {
    description: 'Array of AccessControl model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(AccessControl, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(AccessControl) filter?: Filter<AccessControl>,
  ): Promise<AccessControl[]> {
    return this.accessControlRepository.find(filter);
  }

  @patch('/access-controls')
  @response(200, {
    description: 'AccessControl PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AccessControl, {partial: true}),
        },
      },
    })
    accessControl: AccessControl,
    @param.where(AccessControl) where?: Where<AccessControl>,
  ): Promise<Count> {
    return this.accessControlRepository.updateAll(accessControl, where);
  }

  @get('/access-controls/{id}')
  @response(200, {
    description: 'AccessControl model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(AccessControl, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(AccessControl, {exclude: 'where'}) filter?: FilterExcludingWhere<AccessControl>
  ): Promise<AccessControl> {
    return this.accessControlRepository.findById(id, filter);
  }

  @patch('/access-controls/{id}')
  @response(204, {
    description: 'AccessControl PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AccessControl, {partial: true}),
        },
      },
    })
    accessControl: AccessControl,
  ): Promise<void> {
    await this.accessControlRepository.updateById(id, accessControl);
  }

  @put('/access-controls/{id}')
  @response(204, {
    description: 'AccessControl PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() accessControl: AccessControl,
  ): Promise<void> {
    await this.accessControlRepository.replaceById(id, accessControl);
  }

  @del('/access-controls/{id}')
  @response(204, {
    description: 'AccessControl DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.accessControlRepository.deleteById(id);
  }
}
