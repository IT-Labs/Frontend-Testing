/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { TodoItemComponent } from './todo-item.component';
import { Todo } from '../../models/Todo';

describe('TodoItemComponent', () => {
  const getTodo = () => ({
    id: '1',
    title: 'Wash the dishes',
    isCompleted: false,
    createdAt: '2020-06-02T12:20:56.512Z',
  } as Todo);

  describe('native angular TestBed', () => {
    let component: TodoItemComponent;
    let fixture: ComponentFixture<TodoItemComponent>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ TodoItemComponent ]
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(TodoItemComponent);
      component = fixture.componentInstance;
      component.todo = getTodo();
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('spectator', () => {
    const getInputs = (props: Partial<TodoItemComponent> = {}) => {
      return {
        todo: getTodo(),
      } as Partial<TodoItemComponent>;
    }
    const createComponent = createComponentFactory(TodoItemComponent);
    const getComponent = (props: Partial<TodoItemComponent> = {}) => {
      return createComponent({
        props,
       });
    }

    it('should rencer success', () => {
      const inputs = getInputs();
      const spectator = getComponent(inputs);
      expect(spectator).toBeTruthy();
    });
  })
});
