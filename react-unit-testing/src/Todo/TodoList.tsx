import React from 'react';
import loglevel from 'loglevel';
import { Todo } from './Todo';
import TodoItem from './TodoItem';

export interface TodoListProps {
  todos: Todo[];
  onEdit: (todo: Todo) => void;
  onRemove: (todo: Todo) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  onEdit,
  onRemove,
}) => {
  loglevel.debug('TodoList');
  
  return (
    <div>
      {todos.map((todo) => (
        <TodoItem 
          key={todo.title}
          todo={todo}
          onEdit={onEdit}
          onRemove={onRemove}
        />
      ))}
    </div>
  )
};

export default React.memo(TodoList);
