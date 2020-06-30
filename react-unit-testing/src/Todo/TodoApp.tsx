import React from 'react';
import loglevel from 'loglevel';
import { Todo } from './Todo';
import TodoList from './TodoList';
import { createUseStyles } from 'react-jss';
import ChosenTodoForm from './ChosenTodoForm';

const useStyles = createUseStyles({
  container: {
    marginTop: '30px',
    margin: 'auto',
    maxWidth: '800px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  }
});

interface Props {
  todos: Todo[];
  chosenTodo?: Todo;
  onEdit: (todo: Todo) => void;
  onRemove: (todo: Todo) => void;
  onUpdate: (todo: Todo) => void;
  onCancelUpdate: () => void;
  onAdd: () => void;
}

const TodoApp: React.FC<Props> = ({
  todos,
  chosenTodo,
  onEdit,
  onRemove,
  onUpdate,
  onCancelUpdate,
  onAdd,
}) => {
  loglevel.debug('TodoApp');
  const classes = useStyles();
  
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <h1>Todo App</h1>
        <button onClick={onAdd} data-testid="addBtn">
          Add
        </button>
      </div>
      <TodoList todos={todos} onEdit={onEdit} onRemove={onRemove} />
      <div>
        {chosenTodo && (
          <ChosenTodoForm 
            chosenTodo={chosenTodo}
            onUpdate={onUpdate}
            onCancelUpdate={onCancelUpdate}
          />
        )}
      </div>
    </div>
  )
};

export default React.memo(TodoApp);
