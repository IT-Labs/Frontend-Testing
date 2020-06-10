import React, { useRef, useEffect, useState, useCallback } from 'react';
import loglevel from 'loglevel';
import { Todo } from './Todo';

export interface ChosenTodoFormProps {
  chosenTodo: Todo;
  onUpdate: (updatedTodo: Todo) => void;
  onCancelUpdate: () => void;
}

const ChosenTodoForm: React.FC<ChosenTodoFormProps> = ({
  chosenTodo,
  onUpdate,
  onCancelUpdate,
}) => {
  loglevel.debug('ChosenTodoForm');
  
  const titleRef = useRef<HTMLInputElement>(null);
  const [titleError, setTitleError] = useState<string>();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!titleRef.current) {
      return;
    }

    if (!titleRef.current.value) {
      setTitleError('Field is required');
      return;
    }
    
    onUpdate({
      ...chosenTodo,
      title: titleRef.current.value,
    })
  }

  useEffect(() => {
    if(!titleRef.current) {
      return;
    }

    titleRef.current.value = chosenTodo.title;
    setTitleError('');
  }, [chosenTodo]);

  const handleBlur = useCallback(() => {
    if (titleRef.current && !titleRef.current.value) {
      setTitleError('Field is required');
    } else {
      setTitleError('');
    }
  }, []);

  return (
    <form onSubmit={onSubmit}>
      <h2>Update Todo</h2>
      <div>
        <label htmlFor="title" style={{marginRight: '5px'}}>Title</label>
      </div>
      <div>
        <input 
          type="text"
          id="title"
          defaultValue={chosenTodo.title}
          ref={titleRef}
          onBlur={handleBlur}
          style={{marginBottom: '5px'}}
        />
      </div>
      <div style={{color: 'red'}}>
        {titleError}
      </div>
      <div>
        <button type="submit" style={{marginRight: '5px'}}>Save</button>
        <button type="button" onClick={onCancelUpdate}>Cancel</button>
      </div>
    </form>
  );
};

export default ChosenTodoForm;
