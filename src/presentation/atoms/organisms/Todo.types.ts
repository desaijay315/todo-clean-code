import { Todo } from '../../../domain/entities/Todo'

export interface TodoFormProps {
    onSubmit: (data: { title: string }) => void;
    defaultTitle?: string;
    submitButtonText?: string;
    onCancel?: () => void;
  }
  
  export interface TodoItemProps {
    todo: Todo;
    onDelete: (id: number) => void;
    onUpdate: (todo: Todo) => void;
}