/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Spectator, createComponentFactory, byText } from '@ngneat/spectator/jest';
import { TodoItemComponent } from './todo-item.component';
import { Todo } from '../../models/Todo';

describe('TodoItemComponent', () => {
  const getTodo = () => ({
    id: '1',
    title: 'Wash the dishes',
    isCompleted: false,
    createdAt: '2020-06-02T12:20:56.512Z',
  } as Todo);

  describe('spectator', () => {
    const getInputs = (props: Partial<TodoItemComponent> = {}) => {
      return {
        todo: getTodo(),
        ...props,
      } as Partial<TodoItemComponent>;
    }
    const createComponent = createComponentFactory(TodoItemComponent);
    const getComponent = (props: Partial<TodoItemComponent> = {}) => {
      return createComponent({
        props,
       });
    }

    it('should render success', () => {
      const inputs = getInputs();
      const spectator = getComponent(inputs);

      expect(spectator).toBeTruthy();
    });

    it('should render todo name', () => {
      const inputs = getInputs();
      const spectator = getComponent(inputs);

      expect(spectator.query(byText(inputs.todo.title))).toBeTruthy();
    });

    it('should render created date', () => {
      const inputs = getInputs();
      const spectator = getComponent(inputs);
      spectator.component.ngOnChanges();
      spectator.detectChanges();
      expect(spectator.query(byText('Jun 2, 2020'))).toBeTruthy();
    });

    it('should render "Done" when todo completed', () => {
      const todo = getTodo();
      todo.isCompleted = true;
      const inputs = getInputs({ todo });
      const spectator = getComponent(inputs);

      expect(spectator.query(byText('Done'))).toBeTruthy();
    });

    it('should render "Pending" when todo not completed', () => {
      const todo = getTodo();
      todo.isCompleted = false;
      const inputs = getInputs({ todo });
      const spectator = getComponent(inputs);

      expect(spectator.query(byText('Pending'))).toBeTruthy();
    });

    it('should render Remove btn', () => {
      const inputs = getInputs();
      const spectator = getComponent(inputs);

      expect(spectator.query(byText('Remove'))).toBeTruthy();
    });

    it('Should render Edit btn', () => {
      const inputs = getInputs();
      const spectator = getComponent(inputs);

      expect(spectator.query(byText('Edit'))).toBeTruthy();
    });

    it('should emit onEdit cb on Edit btn click', () => {
      const inputs = getInputs();
      const spectator = getComponent(inputs);
      const onEdit = jest.fn();
      spectator.output('onEdit').subscribe(onEdit);
      spectator.click(spectator.query(byText('Edit')));

      expect(onEdit).toHaveBeenCalled();
    });

    it('should emit onRemove cb on Remove btn click', () => {
      const inputs = getInputs();
      const spectator = getComponent(inputs);
      const onRemove = jest.fn();
      spectator.output('onRemove').subscribe(onRemove);

      spectator.click(spectator.query(byText('Remove')));

      expect(onRemove).toHaveBeenCalled();
    });
  })
});
