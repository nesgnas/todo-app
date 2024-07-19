import {Entity, model, property, hasMany} from '@loopback/repository';
import {Credential} from './credential.model';
import {Todo} from './todo.model';
import {Project} from './project.model';
import {UserPermission} from './user-permission.model';

@model()
export class User extends Entity {
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
  userName: string;

  @property({
    type: 'string',
    required: true,
  })
  userInfo: string;

  @hasMany(() => Credential)
  credentials: Credential[];

  @hasMany(() => Todo)
  todos: Todo[];

  @hasMany(() => Project)
  projects: Project[];

  @hasMany(() => UserPermission)
  userPermissions: UserPermission[];

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
