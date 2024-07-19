import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Permission, PermissionRelations, AccessControl} from '../models';
import {AccessControlRepository} from './access-control.repository';

export class PermissionRepository extends DefaultCrudRepository<
  Permission,
  typeof Permission.prototype.id,
  PermissionRelations
> {

  public readonly accessControls: HasManyRepositoryFactory<AccessControl, typeof Permission.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('AccessControlRepository') protected accessControlRepositoryGetter: Getter<AccessControlRepository>,
  ) {
    super(Permission, dataSource);
    this.accessControls = this.createHasManyRepositoryFactoryFor('accessControls', accessControlRepositoryGetter,);
    this.registerInclusionResolver('accessControls', this.accessControls.inclusionResolver);
  }
}
