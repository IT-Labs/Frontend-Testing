import { useState, useCallback, useEffect } from "react";
import { Todo } from "./Todo";
import { getTodos, updateTodo, addTodo, deleteTodo } from './todoApi';

const useTodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todosLoading, setTodosLoading] = useState(true);
  const [chosenTodo, setChosenTodo] = useState<Todo>();

  useEffect(() => {
    let isMounted = true;
    getTodos()
      .then((res) => {
        if (isMounted) {
          setTodos(res);
          setTodosLoading(false)
        }
      });

    return () => {
      isMounted = false;
    }
  }, []);

  const update = useCallback((todoToUpdate: Todo) => {
    if (!todoToUpdate) {
      return Promise.resolve();
    }

    let update$: Promise<Todo>;
    if (todoToUpdate.id) {
      update$ = updateTodo(todoToUpdate.id, todoToUpdate);
    } else {
      update$ = addTodo(todoToUpdate);
    }

    return update$.then((todo) => {
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
    });
  }, []);

  const remove = useCallback((todo: Todo) => {
    return deleteTodo(todo.id)
      .then((res) => {
        setTodos((oldTodos) => {
          return oldTodos.filter((t) => t !== todo);
        });
        setChosenTodo((c) => {
          if (c === todo) {
            return undefined;
          }
          return c;
        });
      })
  }, []);

  const cancelUpdate = useCallback(() => {
    setChosenTodo(undefined);
  }, []);

  const onAdd = useCallback(() => {
    setChosenTodo({
      id: '',
      title: '',
      createdAt: new Date().toJSON(),
      isCompleted: false,
    })
  }, []);

  return {
    todos,
    todosLoading,
    chosenTodo,
    setChosenTodo,
    onAdd,
    cancelUpdate,
    remove,
    update,
  }
}

export default useTodoApp;