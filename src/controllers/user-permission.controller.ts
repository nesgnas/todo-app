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
import {UserPermission} from '../models';
import {UserPermissionRepository} from '../repositories';

export class UserPermissionController {
  constructor(
    @repository(UserPermissionRepository)
    public userPermissionRepository : UserPermissionRepository,
  ) {}

  @post('/user-permissions')
  @response(200, {
    description: 'UserPermission model instance',
    content: {'application/json': {schema: getModelSchemaRef(UserPermission)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserPermission, {
            title: 'NewUserPermission',
            exclude: ['id'],
          }),
        },
      },
    })
    userPermission: Omit<UserPermission, 'id'>,
  ): Promise<UserPermission> {
    return this.userPermissionRepository.create(userPermission);
  }

  @get('/user-permissions/count')
  @response(200, {
    description: 'UserPermission model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(UserPermission) where?: Where<UserPermission>,
  ): Promise<Count> {
    return this.userPermissionRepository.count(where);
  }

  @get('/user-permissions')
  @response(200, {
    description: 'Array of UserPermission model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(UserPermission, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(UserPermission) filter?: Filter<UserPermission>,
  ): Promise<UserPermission[]> {
    return this.userPermissionRepository.find(filter);
  }

  @patch('/user-permissions')
  @response(200, {
    description: 'UserPermission PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserPermission, {partial: true}),
        },
      },
    })
    userPermission: UserPermission,
    @param.where(UserPermission) where?: Where<UserPermission>,
  ): Promise<Count> {
    return this.userPermissionRepository.updateAll(userPermission, where);
  }

  @get('/user-permissions/{id}')
  @response(200, {
    description: 'UserPermission model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(UserPermission, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(UserPermission, {exclude: 'where'}) filter?: FilterExcludingWhere<UserPermission>
  ): Promise<UserPermission> {
    return this.userPermissionRepository.findById(id, filter);
  }

  @patch('/user-permissions/{id}')
  @response(204, {
    description: 'UserPermission PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserPermission, {partial: true}),
        },
      },
    })
    userPermission: UserPermission,
  ): Promise<void> {
    await this.userPermissionRepository.updateById(id, userPermission);
  }

  @put('/user-permissions/{id}')
  @response(204, {
    description: 'UserPermission PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() userPermission: UserPermission,
  ): Promise<void> {
    await this.userPermissionRepository.replaceById(id, userPermission);
  }

  @del('/user-permissions/{id}')
  @response(204, {
    description: 'UserPermission DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.userPermissionRepository.deleteById(id);
  }
}
