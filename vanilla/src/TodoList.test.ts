import { TodosList } from './TodosList';
import { Todo } from './activeTodos';
import { getTodos } from './todoService';

// jest.mock('./todoService', () => {
//   return {
//     getTodos: () => [{id: '1', title: 'my first item', isActive: false}] as Todo[]
//   }
// });

// jest.mock('./todoService', () => {
//   return {
//     getTodos: jest.fn()
//   }
// });

jest.mock('./todoService');

describe('TodosList', () => {
  const mockGetTodos = getTodos as jest.Mock;

  it('should render single todo', () => {
    console.log(getTodos);
    mockGetTodos.mockReturnValue([{id: '1', title: 'my first item', isActive: false}] as Todo[]);
    const container = document.createElement('div');
    document.body.appendChild(container);

    TodosList(container);

    const todosCount = container.querySelectorAll('[data-type="todo"]');
    expect(todosCount.length).toBe(1);
  });

  it('should render two todos', () => {
    mockGetTodos.mockReturnValue([
      {id: '1', title: 'my first item', isActive: false},
      {id: '2', title: 'my second todo', isActive: false}
    ] as Todo[]);
    const container = document.createElement('div');
    document.body.appendChild(container);

    TodosList(container);

    const todosCount = container.querySelectorAll('[data-type="todo"]');
    expect(todosCount.length).toBe(2);
  })
});
