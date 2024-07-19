import {Entity, model, property, hasMany} from '@loopback/repository';
import {AccessControl} from './access-control.model';

@model()
export class Permission extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  typeOfPermist: string;

  @hasMany(() => AccessControl)
  accessControls: AccessControl[];

  constructor(data?: Partial<Permission>) {
    super(data);
  }
}

export interface PermissionRelations {
  // describe navigational properties here
}

export type PermissionWithRelations = Permission & PermissionRelations;
