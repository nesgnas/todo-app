import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import { MongodbDataSource} from '../datasources';
import {ProjectPermisisonParticipant, ProjectPermisisonParticipantRelations, UserPermission, Project} from '../models';
import {UserPermissionRepository} from './user-permission.repository';
import {ProjectRepository} from './project.repository';

export class ProjectPermisisonParticipantRepository extends DefaultCrudRepository<
  ProjectPermisisonParticipant,
  typeof ProjectPermisisonParticipant.prototype.id,
  ProjectPermisisonParticipantRelations
> {

  public readonly userPermission: BelongsToAccessor<UserPermission, typeof ProjectPermisisonParticipant.prototype.id>;

  public readonly project: BelongsToAccessor<Project, typeof ProjectPermisisonParticipant.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UserPermissionRepository') protected userPermissionRepositoryGetter: Getter<UserPermissionRepository>, @repository.getter('ProjectRepository') protected projectRepositoryGetter: Getter<ProjectRepository>,
  ) {
    super(ProjectPermisisonParticipant, dataSource);
    this.project = this.createBelongsToAccessorFor('project', projectRepositoryGetter,);
    this.registerInclusionResolver('project', this.project.inclusionResolver);
    this.userPermission = this.createBelongsToAccessorFor('userPermission', userPermissionRepositoryGetter,);
    this.registerInclusionResolver('userPermission', this.userPermission.inclusionResolver);
  }
}
