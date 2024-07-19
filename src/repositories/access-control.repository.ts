import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {AccessControl, AccessControlRelations, Roles, Permission, UserPermission} from '../models';
import {RolesRepository} from './roles.repository';
import {PermissionRepository} from './permission.repository';
import {UserPermissionRepository} from './user-permission.repository';

export class AccessControlRepository extends DefaultCrudRepository<
  AccessControl,
  typeof AccessControl.prototype.id,
  AccessControlRelations
> {

  public readonly roles: BelongsToAccessor<Roles, typeof AccessControl.prototype.id>;

  public readonly permission: BelongsToAccessor<Permission, typeof AccessControl.prototype.id>;

  public readonly userPermissions: HasManyRepositoryFactory<UserPermission, typeof AccessControl.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('RolesRepository') protected rolesRepositoryGetter: Getter<RolesRepository>, @repository.getter('PermissionRepository') protected permissionRepositoryGetter: Getter<PermissionRepository>, @repository.getter('UserPermissionRepository') protected userPermissionRepositoryGetter: Getter<UserPermissionRepository>,
  ) {
    super(AccessControl, dataSource);
    this.userPermissions = this.createHasManyRepositoryFactoryFor('userPermissions', userPermissionRepositoryGetter,);
    this.registerInclusionResolver('userPermissions', this.userPermissions.inclusionResolver);
    this.permission = this.createBelongsToAccessorFor('permission', permissionRepositoryGetter,);
    this.registerInclusionResolver('permission', this.permission.inclusionResolver);
    this.roles = this.createBelongsToAccessorFor('roles', rolesRepositoryGetter,);
    this.registerInclusionResolver('roles', this.roles.inclusionResolver);
  }
}
