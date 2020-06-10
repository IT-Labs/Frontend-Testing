import React from 'react';
import loglevel from 'loglevel';
import TodoApp from './TodoApp';
import useTodoApp from './useTodoApp';

interface Props {

}

const TodoAppContainer: React.FC<Props> = () => {
  loglevel.debug('TodoAppContainer');

  const {
    todos,
    chosenTodo,
    onAdd,
    remove,
    cancelUpdate,
    update,
    setChosenTodo,
  } = useTodoApp();

  return (
    <TodoApp
      todos={todos}
      chosenTodo={chosenTodo}
      onEdit={setChosenTodo}
      onRemove={remove}
      onUpdate={update}
      onCancelUpdate={cancelUpdate}
      onAdd={onAdd}
    />
  );
};

export default TodoAppContainer;
