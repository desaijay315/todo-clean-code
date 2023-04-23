import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Todo } from '../domain/entities/Todo';
import { TodoItem } from '../presentation/atoms/organisms/TodoItem';


const todo: Todo = {
    id: 1,
    title: 'Test Todo',
    completed: false,
  };
  const onDeleteMock = jest.fn();
  const onUpdateMock = jest.fn();
  

describe('TodoItem', () => {
    beforeEach(() => {
        jest.clearAllMocks();
      });
  it('should render the todo title', () => {
    render(<TodoItem todo={todo} onDelete={onDeleteMock} onUpdate={onUpdateMock} />);
    const titleElement = screen.getByText(todo.title);
    expect(titleElement).toBeInTheDocument();
  });

  it('should call onDelete when delete button is clicked', () => {
    const onDeleteMock = jest.fn();
    render(<TodoItem todo={todo} onDelete={onDeleteMock} onUpdate={onUpdateMock} />);
    const deleteButtonElement = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButtonElement);
    expect(onDeleteMock).toHaveBeenCalledTimes(1);
    expect(onDeleteMock).toHaveBeenCalledWith(todo.id);
  });

  it('should show the edit form when the Edit button is clicked', () => {
    render(<TodoItem todo={todo} onDelete={onDeleteMock} onUpdate={onUpdateMock} />);
    const editButtonElement = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editButtonElement);
    const inputElement = screen.getByPlaceholderText('Enter todo title');
    expect(inputElement).toBeInTheDocument();
  });

  it('should call onUpdate when the form is submitted with a new title', () => {
    const onUpdateMock = jest.fn();
    render(<TodoItem todo={todo} onDelete={onDeleteMock} onUpdate={onUpdateMock} />);
    const editButtonElement = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editButtonElement);
    const inputElement = screen.getByPlaceholderText('Enter todo title');
    fireEvent.change(inputElement, { target: { value: 'New Test Todo' } });
    const saveButtonElement = screen.getByRole('button', { name: /save/i });
    fireEvent.click(saveButtonElement);
    expect(onUpdateMock).toHaveBeenCalledTimes(1);
    expect(onUpdateMock).toHaveBeenCalledWith({ ...todo, title: 'New Test Todo' });
  });

  it('should set isEditing to false when cancel button is clicked', () => {
    const onCancelMock = jest.fn();
    render(<TodoItem todo={todo} onDelete={onDeleteMock} onUpdate={onUpdateMock} />);
    const editButtonElement = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editButtonElement);
    const cancelButtonElement = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(cancelButtonElement);
  });
  
});
