import {Entity, model, property, belongsTo} from '@loopback/repository';
import {User} from './user.model';
import {Project} from './project.model';

@model()
export class Todo extends Entity {
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
  todoContent: string;

  @belongsTo(() => User)
  userId: string;

  @belongsTo(() => Project)
  projectId: string;

  constructor(data?: Partial<Todo>) {
    super(data);
  }
}

export interface TodoRelations {
  // describe navigational properties here
}

export type TodoWithRelations = Todo & TodoRelations;
