import React, { useEffect } from 'react';
import { useForm, useFormContext } from 'react-hook-form';
import { TodoFormProps } from './Todo.types';

export const TodoForm: React.FC<TodoFormProps> = ({
  onSubmit,
  defaultTitle,
  submitButtonText = 'Submit',
  onCancel,
}) => {
  const { register, setValue, watch } = useForm<{ title: string }>();
  const title = watch('title');
  console.log({title}, "weweew")


  const handleButtonClick = () => {
    console.log({title})
    onSubmit({title});
  };

  return (
    <form>
      <input {...register('title', { required: true })} placeholder="Enter todo title" />
      <button type="button" onClick={() => handleButtonClick()}>{submitButtonText}</button>
      {onCancel && (
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      )}
    </form>
  );
};