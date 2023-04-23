import { createContext, useContext } from 'react';
import { TodoRepository } from '../../repositories/TodoRepository';
import { LocalStorageTodoRepository } from '../../repositories/localStorage/LocalStorageRepository';

const TodoContext = createContext<TodoRepository>(new LocalStorageTodoRepository());

export const useTodoContext = (): TodoRepository => useContext(TodoContext);

export const TodoProvider: React.FC = ({ children }) => {
  const todoRepository = new LocalStorageTodoRepository();
return <TodoContext.Provider value={todoRepository}>{children}</TodoContext.Provider>;
};
