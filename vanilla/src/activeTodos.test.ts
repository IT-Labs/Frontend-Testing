import findActiveTodos, { Todo } from "./activeTodos"

describe('activeTodos', () => {
  it('should return active todo', () => {
    const todos: Todo[] = [
      {id: '1', title: 'random', isActive: false},
      {id: '2', title: 'random second', isActive: true},
      {id: '3', title: 'random 3', isActive: false},
    ];
    const active = todos[1];

    const result = findActiveTodos(todos);

    expect(result).toBe(active);
  })
})