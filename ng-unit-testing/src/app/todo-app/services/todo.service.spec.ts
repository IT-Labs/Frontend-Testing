/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TodoService } from './todo.service';
import { Todo } from '../models/Todo';
import { createServiceFactory, Spectator, SpectatorService } from '@ngneat/spectator/jest';

describe('Service: Todo', () => {

  function getTodo(): Todo {
    return {
      id: '1',
      title: 'Wash the dishes',
      isCompleted: false,
      createdAt: '2020-06-02T12:20:56.512Z',
    }
  }

  const createService = createServiceFactory(TodoService);

  const getTodos = (spectator: SpectatorService<TodoService>) => {
    let todos: Todo[];
    spectator.service.todos.subscribe((t) => {todos = t});

    return todos;
  }

  const getChosenTodo = (spectator: SpectatorService<TodoService>) => {
    let chosen: Todo;
    spectator.service.chosenTodo.subscribe((t) => {chosen = t});

    return chosen;
  }

  it('should render correctly', () => {
    const spectator = createService();
    expect(spectator).toBeTruthy();
  });

  it('should set initial todos', () => {
    const spectator = createService();

    expect(getTodos(spectator)).toHaveLength(3);
  });

  it('should not have chosen item initially', () => {
    const spectator = createService();

    expect(getChosenTodo(spectator)).toBeFalsy();
  });

  it('should set chosen item', () => {
    const spectator = createService();
    const newChosenTodo = getTodo();

    spectator.service.setChosenTodo(newChosenTodo);

    expect(getChosenTodo(spectator)).toBe(newChosenTodo);
  });

  it('should set new chosen item onAdd', () => {
    const spectator = createService();

    spectator.service.onAdd();

    const chosenTodo = getChosenTodo(spectator);
    expect(chosenTodo).toBeTruthy();
    expect(getTodos(spectator)).not.toContain(chosenTodo);
  });

  it('should remove todo', () => {
    const spectator = createService();
    const currentLength = getTodos(spectator).length;
    const todoToRemove = getTodos(spectator)[1];

    spectator.service.remove(todoToRemove);

    const todos = getTodos(spectator);
    expect(todos).not.toContain(todoToRemove);
    expect(todos).toHaveLength(currentLength - 1);
  });

  it('should update existing todo', () => {
    const spectator = createService();
    const todoToUpdate = getTodos(spectator)[1];
    const updatedTodo: Todo = {...todoToUpdate, title: 'some changed value'};

    spectator.service.setChosenTodo(todoToUpdate);
    spectator.service.update(updatedTodo);

    const todos = getTodos(spectator);
    expect(todos).not.toContain(todoToUpdate);
    expect(todos).toContain(updatedTodo);
    expect(todos.indexOf(updatedTodo)).toBe(1);
  });

  it('should keep same array index when todo is updated', () => {
    const spectator = createService();
    const todoToUpdate = getTodos(spectator)[1];
    const updatedTodo: Todo = {...todoToUpdate, title: 'some changed value'};

    spectator.service.setChosenTodo(todoToUpdate);
    spectator.service.update(updatedTodo);

    expect(getTodos(spectator).indexOf(updatedTodo)).toBe(1);
  });

  it('should clean chosen todo on cancel update', () => {
    const spectator = createService();
    spectator.service.setChosenTodo(getTodos(spectator)[1]);

    spectator.service.cancelUpdate();

    expect(getChosenTodo(spectator)).toBeFalsy();
  });
});
