import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Roles} from './roles.model';
import {Permission} from './permission.model';
import {UserPermission} from './user-permission.model';

@model()
export class AccessControl extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @belongsTo(() => Roles)
  rolesId: string;

  @belongsTo(() => Permission)
  permissionId: string;

  @hasMany(() => UserPermission)
  userPermissions: UserPermission[];

  constructor(data?: Partial<AccessControl>) {
    super(data);
  }
}

export interface AccessControlRelations {
  // describe navigational properties here
}

export type AccessControlWithRelations = AccessControl & AccessControlRelations;
