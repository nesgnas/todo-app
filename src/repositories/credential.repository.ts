import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import { MongodbDataSource} from '../datasources';
import {Credential, CredentialRelations, User} from '../models';
import {UserRepository} from './user.repository';

export class CredentialRepository extends DefaultCrudRepository<
  Credential,
  typeof Credential.prototype.id,
  CredentialRelations
> {

  public readonly user: BelongsToAccessor<User, typeof Credential.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Credential, dataSource);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
