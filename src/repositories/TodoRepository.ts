import { Todo } from '../entities/Todo';

export interface TodoRepository {
  getAll(): Promise<Todo[]>;
  add(todo: Omit<Todo, 'id'>): Promise<Todo>;
  update(todo: Todo): Promise<Todo>;
  delete(id: number): Promise<void>;
}
