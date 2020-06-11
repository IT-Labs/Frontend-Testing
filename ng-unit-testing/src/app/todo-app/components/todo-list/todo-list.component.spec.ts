/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TodoListComponent } from './todo-list.component';
import { createComponentFactory, byTestId } from '@ngneat/spectator/jest';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { CommonModule } from '@angular/common';

describe('TodoListComponent', () => {
  const getTodos = () => [
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

  const getInputs = (props: Partial<TodoListComponent> = {}) => {
    return {
      todos: getTodos(),
      ...props,
    } as Partial<TodoListComponent>;
  }
  const createComponent = createComponentFactory({
    component: TodoListComponent,
    declarations: [TodoItemComponent],
    imports: [CommonModule],
  });
  const getComponent = (props: Partial<TodoListComponent> = {}) => {
    return createComponent({
      props,
     });
  }

  it('should create', () => {
    const spectator = getComponent();
    expect(spectator).toBeTruthy();
  });

  it('should render all todos', () => {
    const inputs = getInputs();
    const spectator = getComponent(inputs);

    const renderedTodos = spectator.queryAll('[data-testid="todoitem"]');
    expect(renderedTodos).toHaveLength(inputs.todos.length);
  });
});
