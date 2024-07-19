import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {User} from './user.model';
import {AccessControl} from './access-control.model';
import {ProjectPermisisonParticipant} from './project-permisison-participant.model';

@model()
export class UserPermission extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @belongsTo(() => User)
  userId: string;

  @belongsTo(() => AccessControl)
  accessControlId: string;

  @hasMany(() => ProjectPermisisonParticipant)
  projectPermisisonParticipants: ProjectPermisisonParticipant[];

  constructor(data?: Partial<UserPermission>) {
    super(data);
  }
}

export interface UserPermissionRelations {
  // describe navigational properties here
}

export type UserPermissionWithRelations = UserPermission & UserPermissionRelations;
