import { Todo } from '../entities/Todo';
import { TodoRepository } from '../../repositories/TodoRepository';

type TodoOperationResult = {
    todos: Todo[];
};

export type TodoOperations = {
    addTodo: (title: string) => Promise<TodoOperationResult>;
    updateTodo: (todo: Todo) => Promise<TodoOperationResult>;
    deleteTodo: (id: number) => Promise<TodoOperationResult>;
    getAll: () => Promise<TodoOperationResult>;
};

export const createTodoOperations = (repository: TodoRepository): TodoOperations => {
    const getAll = async (): Promise<TodoOperationResult> => {
        const todos = await repository.getAll();
        return { todos };
    };

    const addTodo = async (title: string): Promise<TodoOperationResult> => {
        const newTodo = await repository.add({ title, completed: false });
        const todos = await repository.getAll();
        return { todos };
    };

    const updateTodo = async (todo: Todo): Promise<TodoOperationResult> => {
        await repository.update(todo);
        const todos = await repository.getAll();
        return { todos };
    };

    const deleteTodo = async (id: number): Promise<TodoOperationResult> => {
        await repository.delete(id);
        const todos = await repository.getAll();
        return { todos };
    };

    return { addTodo, updateTodo, deleteTodo, getAll };
};
