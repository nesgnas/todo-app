import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Roles, RolesRelations, AccessControl} from '../models';
import {AccessControlRepository} from './access-control.repository';

export class RolesRepository extends DefaultCrudRepository<
  Roles,
  typeof Roles.prototype.id,
  RolesRelations
> {

  public readonly accessControls: HasManyRepositoryFactory<AccessControl, typeof Roles.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('AccessControlRepository') protected accessControlRepositoryGetter: Getter<AccessControlRepository>,
  ) {
    super(Roles, dataSource);
    this.accessControls = this.createHasManyRepositoryFactoryFor('accessControls', accessControlRepositoryGetter,);
    this.registerInclusionResolver('accessControls', this.accessControls.inclusionResolver);
  }
}
