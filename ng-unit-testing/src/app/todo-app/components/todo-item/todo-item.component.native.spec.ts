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

  describe('native angular TestBed', () => {
    let component: TodoItemComponent;
    let fixture: ComponentFixture<TodoItemComponent>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ TodoItemComponent ],
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(TodoItemComponent);
      component = fixture.componentInstance;
    });

    it('should create', () => {
      component.todo = getTodo();
      fixture.detectChanges();
      expect(component).toBeTruthy();
    });

    it('should render title', () => {
      component.todo = getTodo();

      fixture.detectChanges();

      expect(document.body.textContent).toContain(component.todo.title);
    });

    it('should emit onEdit on clicking Edit btn', () => {
      const onEdit = jest.fn();
      component.todo = getTodo();
      component.onEdit.subscribe(onEdit);
      fixture.detectChanges();

      const editBtn = document.querySelector('[data-editbtn]');
      editBtn.dispatchEvent(new MouseEvent('click', { bubbles: true }));

      expect(onEdit).toHaveBeenCalled();
    })
  });
});
