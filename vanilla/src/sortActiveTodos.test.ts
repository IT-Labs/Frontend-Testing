import sortActiveTodos from './sortActiveTodos';
import { Todo } from './activeTodos';
describe('sortActiveTodos', () => {
  const activeTodos: Todo[] = [
    {id: '3', title: 'kom', isActive: true},
    {id: '1', title: 'abc', isActive: true},
    {id: '2', title: 'efg', isActive: true},
  ];
  
  it('should sort 3 todos - [1,2,3]', () => {

    const getActiveTodos = jest.fn().mockReturnValue(activeTodos);

    // getActiveTodos() === activeTodos;
    const result = sortActiveTodos(getActiveTodos);

    expect(getActiveTodos).toHaveBeenCalled();
    expect(result[0]).toBe(activeTodos[1]);
    expect(result[1]).toBe(activeTodos[2]);
    expect(result[2]).toBe(activeTodos[0]);
  });

  it('using mock implementation', () => {
    const getActiveTodos = jest.fn().mockImplementation(() => {
      return activeTodos;
    })

    const result = sortActiveTodos(getActiveTodos);

    expect(getActiveTodos).toHaveBeenCalled();
    expect(result[0]).toBe(activeTodos[1]);
    expect(result[1]).toBe(activeTodos[2]);
    expect(result[2]).toBe(activeTodos[0]);
  });

  it('checking .mock', () => {
    const getActiveTodos = jest.fn().mockReturnValue(activeTodos);

    sortActiveTodos(getActiveTodos);
    
    expect(getActiveTodos.mock.calls[0][0]).toBe(5);
  })
})