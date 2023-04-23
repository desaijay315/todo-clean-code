import React, { useState } from 'react';
import { Todo } from '../../../domain/entities/Todo';
import { TodoForm } from './TodoForm';
import { TodoItemProps } from './Todo.types'


export const TodoItem: React.FC<TodoItemProps> = ({ todo, onDelete, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);

    const handleUpdate = (data: { title: string }) => {
        onUpdate({ ...todo, title: data.title });
        setIsEditing(false);
    };
    console.log(isEditing, "isEditing")

    return (
        <div>
            {isEditing ? (
                <TodoForm
                    onSubmit={handleUpdate}
                    defaultTitle={todo.title}
                    submitButtonText="Save"
                    onCancel={() => setIsEditing(false)}
                />
            ) : (
                <>
                    <span>{todo.title}</span>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                </>
            )}
            <button onClick={() => onDelete(todo.id)}>Delete</button>
        </div>
    );
};