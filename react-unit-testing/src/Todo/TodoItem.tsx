import React, { useCallback } from 'react';
import loglevel from 'loglevel';
import { Todo } from './Todo';
import { format } from 'date-fns';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  todoItem: {
    display: 'flex', 
    justifyContent: 'space-between',
    marginTop: '5px',
    marginBottom: '5px',
  },
})

export interface TodoItemProps {
  todo: Todo;
  onEdit: (todo: Todo) => void;
  onRemove: (todo: Todo) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onEdit,
  onRemove,
}) => {
  loglevel.debug('TodoItem');
  const classes = useStyles();

  const handleEdit = useCallback(() => {onEdit(todo)}, [onEdit, todo]);
  const handleRemove = useCallback(() => {onRemove(todo)}, [onRemove, todo]);
  
  return (
    <div className={classes.todoItem} data-testid="todoitem">
      <div>
        <span>
          {todo.isCompleted ? 'Done' : 'Pending'}
        </span>
        {' '}
        <span>{todo.title}</span>
        {' '}
        <span>
          {format(new Date(todo.createdAt), 'MMM d, yyyy')}
        </span>
      </div>
      <div>
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleRemove} style={{ marginLeft: '10px'}}>Remove</button>
      </div>
    </div>
  );
};

export default React.memo(TodoItem);
