import { Todo } from "./activeTodos"
import VanillaTodoItem from "./vanillaTodoItem";

describe('vanillaTodoItem', () => {

  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it('should append todo item', () => {
    const todo: Todo = {
      title: 'Wash the dishes',
      id: '1',
      isActive: true
    };

    VanillaTodoItem(todo, container);

    expect(container.innerHTML).toContain(todo.title);
  });

  it('should add remove btn', () => {
    const todo: Todo = {
      title: 'Wash the dishes',
      id: '1',
      isActive: true
    };

    VanillaTodoItem(todo, container);

    const btn = container.querySelector('button');
    expect(btn).toBeTruthy();
  });

  it('should remove todo item on remove btn click', () => {
    const todo: Todo = {
      title: 'Wash the dishes',
      id: '1',
      isActive: true
    };

    VanillaTodoItem(todo, container);

    expect(container.innerHTML).not.toBe('');

    const btn = container.querySelector('button');

    btn.dispatchEvent(new MouseEvent('click'));

    expect(container.innerHTML).toBe('');
  });
});
