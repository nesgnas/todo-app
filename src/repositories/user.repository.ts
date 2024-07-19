import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {User, UserRelations, Credential, Todo, Project, UserPermission} from '../models';
import {CredentialRepository} from './credential.repository';
import {TodoRepository} from './todo.repository';
import {ProjectRepository} from './project.repository';
import {UserPermissionRepository} from './user-permission.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {

  public readonly credentials: HasManyRepositoryFactory<Credential, typeof User.prototype.id>;

  public readonly todos: HasManyRepositoryFactory<Todo, typeof User.prototype.id>;

  public readonly projects: HasManyRepositoryFactory<Project, typeof User.prototype.id>;

  public readonly userPermissions: HasManyRepositoryFactory<UserPermission, typeof User.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('CredentialRepository') protected credentialRepositoryGetter: Getter<CredentialRepository>, @repository.getter('TodoRepository') protected todoRepositoryGetter: Getter<TodoRepository>, @repository.getter('ProjectRepository') protected projectRepositoryGetter: Getter<ProjectRepository>, @repository.getter('UserPermissionRepository') protected userPermissionRepositoryGetter: Getter<UserPermissionRepository>,
  ) {
    super(User, dataSource);
    this.userPermissions = this.createHasManyRepositoryFactoryFor('userPermissions', userPermissionRepositoryGetter,);
    this.registerInclusionResolver('userPermissions', this.userPermissions.inclusionResolver);
    this.projects = this.createHasManyRepositoryFactoryFor('projects', projectRepositoryGetter,);
    this.registerInclusionResolver('projects', this.projects.inclusionResolver);
    this.todos = this.createHasManyRepositoryFactoryFor('todos', todoRepositoryGetter,);
    this.registerInclusionResolver('todos', this.todos.inclusionResolver);
    this.credentials = this.createHasManyRepositoryFactoryFor('credentials', credentialRepositoryGetter,);
    this.registerInclusionResolver('credentials', this.credentials.inclusionResolver);
  }
}
