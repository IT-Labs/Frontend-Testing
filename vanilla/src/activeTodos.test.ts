import findActiveTodos, { Todo } from "./activeTodos"

describe('activeTodos', () => {
  const todos: Todo[] = [
    {id: '1', title: 'random', isActive: false},
    {id: '2', title: 'random second', isActive: true},
    {id: '3', title: 'random 3', isActive: false},
  ];

  it('should return active todo', () => {
    const active = todos[1];

    const result = findActiveTodos(todos);

    expect(result).toBe(active);
  });

  describe('objects comparison', () => {
    const result = findActiveTodos(todos);

    console.log('todo result', result);
    expect(result).not.toBe({id: '2', title: 'random second', isActive: true});
    expect(result).toEqual({id: '2', title: 'random second', isActive: true});
    expect(result).toHaveProperty('id', '2');
    expect(result).toBeTruthy();
  });
});
