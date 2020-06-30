/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TodoAppContainerComponent } from './todo-app-container.component';
import { createComponentFactory } from '@ngneat/spectator/jest';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodoAppComponent } from '../todo-app/todo-app.component';
import { TodoListComponent } from '../todo-list/todo-list.component';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { ChosenTodoFormComponent } from '../chosen-todo-form/chosen-todo-form.component';
import { mockProvider, byText, byLabel, byTestId } from '@ngneat/spectator';
import { TodoRepositoryService } from '../../services/todo-repository.service';
import { of } from 'rxjs';
import { Todo } from '../../models/Todo';

describe('TodoAppContainerComponent', () => {
  const mockTodos = () => [
    {
      "id": "1",
      "title": "Wash the dishes",
      "isCompleted": false,
      "createdAt": "2020-06-02T12:20:56.512Z"
    },
    {
      "id": "2",
      "title": "Clean your PC",
      "isCompleted": false,
      "createdAt": "2020-05-20T12:20:56.512Z"
    },
    {
      "id": "3",
      "title": "Go biking",
      "isCompleted": true,
      "createdAt": "2020-05-10T12:20:56.512Z"
    }
  ];
  const mockUpdateTodo = jest.fn();
  const mockAddTodo = jest.fn();
  const createComponent = createComponentFactory({
    component: TodoAppContainerComponent,
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
    ],
    declarations: [
      TodoAppComponent,
      TodoListComponent,
      TodoItemComponent,
      ChosenTodoFormComponent,
    ],
    providers: [
      mockProvider(TodoRepositoryService, {
        getTodos: () => of(mockTodos()),
        deleteTodo: () => of(true),
        updateTodo: mockUpdateTodo,
        addTodo: mockAddTodo,
      })
    ]
  });

  it('should create', () => {
    const spectator = createComponent();
    expect(spectator.component).toBeTruthy();
  });

  it('should create new todo', () => {
    const todoTitle = 'my new todo title';
    mockAddTodo.mockReturnValue(of({
      id: Math.random().toString(), title: todoTitle, createdAt: new Date().toJSON(), isCompleted: false
    } as Todo));
    const spectator = createComponent();

    spectator.click(spectator.query(byText('Add')));
    spectator.typeInElement(todoTitle, spectator.query(byLabel('Title')))
    spectator.click(spectator.query(byText('Save')));

    expect(mockAddTodo).toHaveBeenCalled();
    expect(spectator.queryAll(byTestId('todoitem'))).toHaveLength(4);
  });
});
