import { useState, useEffect, useMemo } from 'react';
import { Todo } from '../../domain/entities/Todo';
import { useTodoOperations } from '../../domain/use-cases/hooks/useTodoOperations';
import { TodoItem } from '../atoms/organisms/TodoItem';
import { TodoForm } from '../atoms/organisms/TodoForm';

export const Home: React.FC = () => {
    const todoOperations = useMemo(() => useTodoOperations(), []);
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
      const fetchTodos = async () => {
        const result = await todoOperations.getAll();
        setTodos(result.todos);
      };
  
      fetchTodos();
    }, [todoOperations]);
  
    const handleAddTodo = async (data: { title: string }) => {
        console.log(data, 'data')
      const result = await todoOperations.addTodo(data.title);
      console.log(result, 'result')
      setTodos(result.todos);
    };
  
    const handleUpdateTodo = async (todo: Todo) => {
      const result = await todoOperations.updateTodo(todo);
      setTodos(result.todos);
    };
  
    const handleDeleteTodo = async (id: number) => {
      const result = await todoOperations.deleteTodo(id);
      setTodos(result.todos);
    };
  
    console.log(JSON.stringify(todos), ' todos')
    return (
      <div>
        <h1>Todo List</h1>
        <TodoForm onSubmit={(data) => handleAddTodo(data)} />
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <TodoItem todo={todo} onDelete={handleDeleteTodo} onUpdate={handleUpdateTodo} />
            </li>
          ))}
        </ul>
      </div>
    );
  };