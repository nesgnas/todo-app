import {Entity, model, property, belongsTo} from '@loopback/repository';
import {UserPermission} from './user-permission.model';
import {Project} from './project.model';

@model()
export class ProjectPermisisonParticipant extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @belongsTo(() => UserPermission)
  userPermissionId: string;

  @belongsTo(() => Project)
  projectId: string;

  constructor(data?: Partial<ProjectPermisisonParticipant>) {
    super(data);
  }
}

export interface ProjectPermisisonParticipantRelations {
  // describe navigational properties here
}

export type ProjectPermisisonParticipantWithRelations = ProjectPermisisonParticipant & ProjectPermisisonParticipantRelations;
