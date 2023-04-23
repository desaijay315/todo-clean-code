import { TodoOperations, createTodoOperations } from '../TodoOperations';
import { useTodoContext } from '../../../infrastructure/context/TodoContext';

export const useTodoOperations = (): TodoOperations => {
    const todoRepository = useTodoContext();
    return createTodoOperations(todoRepository);
};
