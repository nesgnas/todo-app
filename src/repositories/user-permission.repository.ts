import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import { MongodbDataSource} from '../datasources';
import {UserPermission, UserPermissionRelations, User, AccessControl, ProjectPermisisonParticipant} from '../models';
import {UserRepository} from './user.repository';
import {AccessControlRepository} from './access-control.repository';
import {ProjectPermisisonParticipantRepository} from './project-permisison-participant.repository';

export class UserPermissionRepository extends DefaultCrudRepository<
  UserPermission,
  typeof UserPermission.prototype.id,
  UserPermissionRelations
> {

  public readonly user: BelongsToAccessor<User, typeof UserPermission.prototype.id>;

  public readonly accessControl: BelongsToAccessor<AccessControl, typeof UserPermission.prototype.id>;

  public readonly projectPermisisonParticipants: HasManyRepositoryFactory<ProjectPermisisonParticipant, typeof UserPermission.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: MongodbDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('AccessControlRepository') protected accessControlRepositoryGetter: Getter<AccessControlRepository>, @repository.getter('ProjectPermisisonParticipantRepository') protected projectPermisisonParticipantRepositoryGetter: Getter<ProjectPermisisonParticipantRepository>,
  ) {
    super(UserPermission, dataSource);
    this.projectPermisisonParticipants = this.createHasManyRepositoryFactoryFor('projectPermisisonParticipants', projectPermisisonParticipantRepositoryGetter,);
    this.registerInclusionResolver('projectPermisisonParticipants', this.projectPermisisonParticipants.inclusionResolver);
    this.accessControl = this.createBelongsToAccessorFor('accessControl', accessControlRepositoryGetter,);
    this.registerInclusionResolver('accessControl', this.accessControl.inclusionResolver);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
