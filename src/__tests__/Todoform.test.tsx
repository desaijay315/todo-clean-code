import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TodoForm } from '../presentation/atoms/organisms/TodoForm';
import { useForm } from 'react-hook-form';

jest.mock('react-hook-form', () => ({
  useForm: jest.fn(() => ({
    register: jest.fn(),
    handleSubmit: jest.fn(),
    setValue: jest.fn(),
    watch: jest.fn()
  })),
}));
const mockedUseForm = useForm as jest.Mock;

describe('TodoForm', () => {
  beforeEach(() => {
    mockedUseForm.mockClear();
  });

  it('should render the input field and submit button', () => {
    render(<TodoForm onSubmit={() => {}} />);
    expect(screen.getByPlaceholderText('Enter todo title')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('should render a form with input and submit button', () => {
    render(<TodoForm onSubmit={() => {}} />);
    const input = screen.getByPlaceholderText('Enter todo title');
    const button = screen.getByText('Submit');
  
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  
  });

  it('should call onSubmit with the entered todo title when the form is submitted via a button click', () => {
    const onSubmitMock = jest.fn();
    render(<TodoForm onSubmit={onSubmitMock} />);
    const inputElement = screen.getByPlaceholderText('Enter todo title');
    fireEvent.change(inputElement, { target: { value: 'Test Todo' } });
    const buttonElement = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(buttonElement);
    expect(onSubmitMock).toHaveBeenCalledTimes(1);
});

  it('should call onCancel when cancel button is clicked', () => {
    const onCancelMock = jest.fn();

    render(<TodoForm onSubmit={jest.fn()} onCancel={onCancelMock} />);

    const cancelButton = screen.getByText('Cancel');
    userEvent.click(cancelButton);

    expect(onCancelMock).toHaveBeenCalledTimes(1);
  });
});