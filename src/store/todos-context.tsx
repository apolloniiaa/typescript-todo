import React, { useState } from 'react';

import Todo from '../models/todo';

type TodosContextObj = {
  items: Todo[];
  addTodo: (text: string) => void;
  removeTodo: (id: string) => void;
};

export const TodosContext = React.createContext<TodosContextObj>({
  items: [],
  addTodo: () => {},
  removeTodo: (id: string) => {},
});

const TodosContextProvider: React.FC<React.PropsWithChildren> = (props) => {
  const [todos, settodos] = useState<Todo[]>([]);

  const addTodoHandler = (toDoText: string) => {
    const newToDo = new Todo(toDoText);
    settodos((prevToDo) => {
      return prevToDo.concat(newToDo);
    });
  };
  const removeTodoHandler = (toDoId: string) => {
    settodos((prevToDo) => {
      return prevToDo.filter((todo) => todo.id !== toDoId);
    });
  };

  const contextValue: TodosContextObj = {
    items: todos,
    addTodo: addTodoHandler,
    removeTodo: removeTodoHandler,
  };

  return (
    <TodosContext.Provider value={contextValue}>
      {props.children}
    </TodosContext.Provider>
  );
};

export default TodosContextProvider;
