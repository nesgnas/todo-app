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
  User,
  Credential,
} from '../models';
import {UserRepository} from '../repositories';

export class UserCredentialController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/credentials', {
    responses: {
      '200': {
        description: 'Array of User has many Credential',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Credential)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Credential>,
  ): Promise<Credential[]> {
    return this.userRepository.credentials(id).find(filter);
  }

  @post('/users/{id}/credentials', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(Credential)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Credential, {
            title: 'NewCredentialInUser',
            exclude: ['id'],
            optional: ['userId']
          }),
        },
      },
    }) credential: Omit<Credential, 'id'>,
  ): Promise<Credential> {
    return this.userRepository.credentials(id).create(credential);
  }

  @patch('/users/{id}/credentials', {
    responses: {
      '200': {
        description: 'User.Credential PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Credential, {partial: true}),
        },
      },
    })
    credential: Partial<Credential>,
    @param.query.object('where', getWhereSchemaFor(Credential)) where?: Where<Credential>,
  ): Promise<Count> {
    return this.userRepository.credentials(id).patch(credential, where);
  }

  @del('/users/{id}/credentials', {
    responses: {
      '200': {
        description: 'User.Credential DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Credential)) where?: Where<Credential>,
  ): Promise<Count> {
    return this.userRepository.credentials(id).delete(where);
  }
}
