import { useState, useCallback } from "react";
import { Todo } from "./Todo";

const initialTodos: Todo[] = [
  {
    id: '1',
    title: 'Wash the dishes',
    isCompleted: false,
    createdAt: '2020-06-02T12:20:56.512Z',
  },
  {
    id: '2',
    title: 'Clean your PC',
    isCompleted: false,
    createdAt: '2020-05-20T12:20:56.512Z',
  },
  {
    id: '3',
    title: 'Go biking',
    isCompleted: true,
    createdAt: '2020-05-10T12:20:56.512Z',
  },
];

const useTodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [chosenTodo, setChosenTodo] = useState<Todo>();

  const update = useCallback((todo: Todo) => {
    if (!todo) {
      return;
    }

    setTodos((oldTodos) => {
      const oldTodo = oldTodos.find((t) => t.id === todo.id);
      if (!oldTodo) {
        return [...oldTodos, todo];
      }

      const index = oldTodos.indexOf(oldTodo);
      const updatedTodos = [
        ...oldTodos,
      ];
      updatedTodos[index] = todo;
      return updatedTodos;
    });

    setChosenTodo(undefined);
  }, []);

  const remove = useCallback((todo: Todo) => {
    setTodos((oldTodos) => {
      return oldTodos.filter((t) => t !== todo);
    });
    setChosenTodo((c) => {
      if (c === todo) {
        return undefined;
      }
      return c;
    });
  }, []);

  const cancelUpdate = useCallback(() => {
    setChosenTodo(undefined);
  }, []);

  const onAdd = useCallback(() => {
    setChosenTodo({
      id: Math.random().toString(),
      title: '',
      createdAt: new Date().toString(),
      isCompleted: false,
    })
  }, []);

  return {
    todos,
    chosenTodo,
    setChosenTodo,
    onAdd,
    cancelUpdate,
    remove,
    update,
  }
}

export default useTodoApp;