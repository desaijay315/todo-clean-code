import { Todo } from '../domain/entities/Todo';
import { TodoRepository } from '../repositories/TodoRepository';
import { createTodoOperations, TodoOperations } from '../domain/use-cases/TodoOperations';

describe('createTodoOperations', () => {
  let repository: TodoRepository;
  let todoOperations: TodoOperations;

  beforeEach(() => {
    repository = {
      add: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      getAll: jest.fn(),
    };
    todoOperations = createTodoOperations(repository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    it('should return all todos', async () => {
      const todos: Todo[] = [
        { id: 1, title: 'Todo 1', completed: false },
        { id: 2, title: 'Todo 2', completed: true },
      ];
      (repository.getAll as jest.Mock).mockResolvedValueOnce(todos);

      const result = await todoOperations.getAll();

      expect(result).toEqual({ todos });
      expect(repository.getAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('addTodo', () => {
    it('should add a new todo and return all todos', async () => {
      const title = 'New Todo';
      const newTodo: Todo = { id: 1, title, completed: false };
      (repository.add as jest.Mock).mockResolvedValueOnce(newTodo);
      const todos: Todo[] = [
        { id: 1, title: 'Todo 1', completed: false },
        { id: 2, title: 'Todo 2', completed: true },
      ];
      (repository.getAll as jest.Mock).mockResolvedValueOnce(todos);

      const result = await todoOperations.addTodo(title);

      expect(result).toEqual({ todos });
      expect(repository.add).toHaveBeenCalledTimes(1);
      expect(repository.add).toHaveBeenCalledWith({ title, completed: false });
      expect(repository.getAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateTodo', () => {
    it('should update a todo and return all todos', async () => {
      const todoToUpdate: Todo = { id: 1, title: 'Todo 1', completed: false };
      (repository.update as jest.Mock).mockResolvedValueOnce(null);
      const todos: Todo[] = [
        { id: 1, title: 'Updated Todo', completed: true },
        { id: 2, title: 'Todo 2', completed: false },
      ];
      (repository.getAll as jest.Mock).mockResolvedValueOnce(todos);

      const result = await todoOperations.updateTodo(todoToUpdate);

      expect(result).toEqual({ todos });
      expect(repository.update).toHaveBeenCalledTimes(1);
      expect(repository.update).toHaveBeenCalledWith(todoToUpdate);
      expect(repository.getAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('deleteTodo', () => {
    it('should delete a todo and return all todos', async () => {
      const id = 1;
      (repository.delete as jest.Mock).mockResolvedValueOnce(null);
      const todos: Todo[] = [
        { id: 2, title: 'Todo 2', completed: false },
      ];
      (repository.getAll as jest.Mock).mockResolvedValueOnce(todos);

      const result = await todoOperations.deleteTodo(id);

      expect(result).toEqual({ todos });
      expect(repository.delete).toHaveBeenCalledTimes(1);
      expect(repository.delete).toHaveBeenCalledWith(id);
      expect(repository.getAll).toHaveBeenCalledTimes(1);
    });
  });
});
