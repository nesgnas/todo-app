import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import { MongodbDataSource} from '../datasources';
import {Project, ProjectRelations, Todo, User, ProjectPermisisonParticipant} from '../models';
import {TodoRepository} from './todo.repository';
import {UserRepository} from './user.repository';
import {ProjectPermisisonParticipantRepository} from './project-permisison-participant.repository';

export class ProjectRepository extends DefaultCrudRepository<
  Project,
  typeof Project.prototype.id,
  ProjectRelations
> {

  public readonly todos: HasManyRepositoryFactory<Todo, typeof Project.prototype.id>;

  public readonly user: BelongsToAccessor<User, typeof Project.prototype.id>;

  public readonly projectPermisisonParticipants: HasManyRepositoryFactory<ProjectPermisisonParticipant, typeof Project.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('TodoRepository') protected todoRepositoryGetter: Getter<TodoRepository>, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('ProjectPermisisonParticipantRepository') protected projectPermisisonParticipantRepositoryGetter: Getter<ProjectPermisisonParticipantRepository>,
  ) {
    super(Project, dataSource);
    this.projectPermisisonParticipants = this.createHasManyRepositoryFactoryFor('projectPermisisonParticipants', projectPermisisonParticipantRepositoryGetter,);
    this.registerInclusionResolver('projectPermisisonParticipants', this.projectPermisisonParticipants.inclusionResolver);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
    this.todos = this.createHasManyRepositoryFactoryFor('todos', todoRepositoryGetter,);
    this.registerInclusionResolver('todos', this.todos.inclusionResolver);
  }
}
