import { Todo } from '../../domain/entities/Todo';
import { TodoRepository } from '../TodoRepository';

export class LocalStorageTodoRepository implements TodoRepository {
  private todosKey = 'todos';

  async getAll(): Promise<Todo[]> {
    const todosJson = localStorage.getItem(this.todosKey);
    return todosJson ? JSON.parse(todosJson) : [];
  }

  async add(todo: Omit<Todo, 'id'>): Promise<Todo> {
    const todos = await this.getAll();
    const newTodo: Todo = { ...todo, id: Date.now() };
    todos.push(newTodo);
    localStorage.setItem(this.todosKey, JSON.stringify(todos));
    return newTodo;
  }

  async update(todo: Todo): Promise<Todo> {
    const todos = await this.getAll();
    const index = todos.findIndex((t) => t.id === todo.id);
    todos[index] = todo;
    localStorage.setItem(this.todosKey, JSON.stringify(todos));
    return todo;
  }

  async delete(id: number): Promise<void> {
    const todos = await this.getAll();
    const filteredTodos = todos.filter((todo) => todo.id !== id);
    localStorage.setItem(this.todosKey, JSON.stringify(filteredTodos));
  }
}
