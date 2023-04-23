import React from 'react';
import { TodoProvider } from '../../infrastructure/context/TodoContext';

export const Providers: React.FC = ({ children }) => {
    return <TodoProvider>{children}</TodoProvider>;
};
