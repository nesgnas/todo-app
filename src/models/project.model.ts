import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Todo} from './todo.model';
import {User} from './user.model';
import {ProjectPermisisonParticipant} from './project-permisison-participant.model';

@model()
export class Project extends Entity {
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
  projectInfo: string;

  @hasMany(() => Todo)
  todos: Todo[];

  @belongsTo(() => User)
  userId: string;

  @hasMany(() => ProjectPermisisonParticipant)
  projectPermisisonParticipants: ProjectPermisisonParticipant[];

  constructor(data?: Partial<Project>) {
    super(data);
  }
}

export interface ProjectRelations {
  // describe navigational properties here
}

export type ProjectWithRelations = Project & ProjectRelations;
