/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By, BrowserModule } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ChosenTodoFormComponent } from './chosen-todo-form.component';
import { Todo } from '../../models/Todo';
import { createComponentFactory, byLabel, byText } from '@ngneat/spectator/jest';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

describe('ChosenTodoFormComponent', () => {
  const getTodo = () => ({
    id: '1',
    title: 'Wash the dishes',
    isCompleted: false,
    createdAt: '2020-06-02T12:20:56.512Z',
  } as Todo);

  function getInputs(props: Partial<ChosenTodoFormComponent> = {}): Partial<ChosenTodoFormComponent> {
    return {
      chosenTodo: getTodo(),
      ...props,
    };
  }

  const createComponent = createComponentFactory({
    component: ChosenTodoFormComponent,
    imports: [FormsModule, ReactiveFormsModule],
  });
  const getComponent = (props: Partial<ChosenTodoFormComponent> = {}) => {
    return createComponent({
      props,
     });
  }

  it('should create', () => {
    const spectator = getComponent();
    expect(spectator).toBeTruthy();
  });

  it('should render title input', () => {
    const inputs = getInputs();
    const spectator = getComponent(inputs);

    expect(spectator.query(byLabel('Title'))).toBeTruthy();
  });

  it('should render save btn', () => {
    const inputs = getInputs();
    const spectator = getComponent(inputs);

    expect(spectator.query(byText('Save'))).toBeTruthy();
  });

  it('should render cancel btn', () => {
    const inputs = getInputs();
    const spectator = getComponent(inputs);

    expect(spectator.query(byText('Cancel'))).toBeTruthy();
  });

  it('should set initial input value of chosen todo', () => {
    const inputs = getInputs();
    const spectator = getComponent(inputs);

    const input = spectator.query(byLabel('Title')) as HTMLInputElement;

    expect(input.value).toBe(inputs.chosenTodo.title);
  });

  it('should emit onUpdate cb when Save btn is clicked', () => {
    const inputs = getInputs();
    const spectator = getComponent(inputs);
    const onUpdate = jest.fn();
    spectator.output('onUpdate').subscribe(onUpdate);

    spectator.click(spectator.query(byText('Save')));
    expect(onUpdate).toHaveBeenCalled();
  });

  it('should emit onCancel cb when Cancel btn is clicked', () => {
    const inputs = getInputs();
    const spectator = getComponent(inputs);
    const onCancelUpdate = jest.fn();
    spectator.output('onCancelUpdate').subscribe(onCancelUpdate);

    spectator.click(spectator.query(byText('Cancel')));
    expect(onCancelUpdate).toHaveBeenCalled();
  });

  it('should validate title required', async () => {
    const todo = getTodo();
    todo.title = '';
    const inputs = getInputs({ chosenTodo: todo });
    const spectator = getComponent(inputs);
    const onUpdate = jest.fn();
    spectator.output('onUpdate').subscribe(onUpdate);

    spectator.focus(spectator.query(byLabel('Title')));
    spectator.blur(spectator.query(byLabel('Title')));

    spectator.click(spectator.query(byText('Save')));
    expect(onUpdate).not.toHaveBeenCalled();
    expect(spectator.query(byText('Field is required'))).toBeTruthy();
  });

  it('should validate success when title is valid', () => {
    const todo = getTodo();
    todo.title = '';
    const inputs = getInputs({ chosenTodo: todo });
    const spectator = getComponent(inputs);
    const onUpdate = jest.fn();
    spectator.output('onUpdate').subscribe(onUpdate);

    spectator.typeInElement('some value', spectator.query(byLabel('Title')));
    spectator.click(spectator.query(byText('Save')));
    expect(onUpdate).toHaveBeenCalled();
    expect(spectator.query(byText('Field is required'))).toBeFalsy();
  });

  it('should not show validation error initially', () => {
    const todo = getTodo();
    todo.title = '';
    const inputs = getInputs({ chosenTodo: todo });
    const spectator = getComponent(inputs);
    const onUpdate = jest.fn();
    spectator.output('onUpdate').subscribe(onUpdate);

    expect(spectator.query(byText('Field is required'))).toBeFalsy();
  });

  it('should show validation error on input blur', () => {
    const todo = getTodo();
    todo.title = '';
    const inputs = getInputs({ chosenTodo: todo });
    const spectator = getComponent(inputs);
    const onUpdate = jest.fn();
    spectator.output('onUpdate').subscribe(onUpdate);

    const input = spectator.query(byLabel('Title'));
    spectator.focus(input);
    spectator.blur(input);

    expect(spectator.query(byText('Field is required'))).toBeTruthy();
  });

  it('should show validation error on submit', () => {
    const todo = getTodo();
    todo.title = '';
    const inputs = getInputs({ chosenTodo: todo });
    const spectator = getComponent(inputs);
    const onUpdate = jest.fn();
    spectator.output('onUpdate').subscribe(onUpdate);

    expect(spectator.query(byText('Field is required'))).toBeFalsy();

    spectator.click(spectator.query(byText('Save')));

    expect(spectator.query(byText('Field is required'))).toBeTruthy();
  })
});
