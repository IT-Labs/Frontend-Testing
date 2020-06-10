import { renderHook, act } from '@testing-library/react-hooks';
import useTodoApp from './useTodoApp';
import { Todo } from './Todo';

describe('useTodoApp', () => {
  function getTodo(): Todo {
    return {
      id: '1',
      title: 'Wash the dishes',
      isCompleted: false,
      createdAt: '2020-06-02T12:20:56.512Z',
    }
  } 
  it('should render correctly', () => {
    renderHook(() => useTodoApp());
  });

  it('should set initial todos', () => {
    const { result } = renderHook(() => useTodoApp());

    expect(result.current.todos).toHaveLength(3);
  });

  it('should not have chosen item initially', () => {
    const { result } = renderHook(() => useTodoApp());

    expect(result.current.chosenTodo).toBeFalsy();
  });

  it('should set chosen item', () => {
    const { result } = renderHook(() => useTodoApp());
    const newChosenTodo = getTodo();

    act(() => result.current.setChosenTodo(newChosenTodo));
    expect(result.current.chosenTodo).toBe(newChosenTodo);
  });

  it('should set new chosen item onAdd', () => {
    const { result } = renderHook(() => useTodoApp());
    
    act(() => result.current.onAdd());

    expect(result.current.chosenTodo).toBeTruthy();
    expect(result.current.todos).not.toContain(result.current.chosenTodo);
  });

  it('should remove todo', () => {
    const { result } = renderHook(() => useTodoApp());
    const currentLength = result.current.todos.length;
    const todoToRemove = result.current.todos[1];

    act(() => result.current.remove(todoToRemove));

    expect(result.current.todos).not.toContain(todoToRemove);
    expect(result.current.todos).toHaveLength(currentLength - 1);
  });

  it('should update existing todo', () => {
    const { result } = renderHook(() => useTodoApp());
    const todoToUpdate = result.current.todos[1];
    const updatedTodo: Todo = {...todoToUpdate, title: 'some changed value'};

    act(() => result.current.setChosenTodo(todoToUpdate));
    act(() => result.current.update(updatedTodo));

    expect(result.current.todos).not.toContain(todoToUpdate);
    expect(result.current.todos).toContain(updatedTodo);
    expect(result.current.todos.indexOf(updatedTodo)).toBe(1);
  });

  it('should keep same array index when todo is updated', () => {
    const { result } = renderHook(() => useTodoApp());
    const todoToUpdate = result.current.todos[1];
    const updatedTodo: Todo = {...todoToUpdate, title: 'some changed value'};

    act(() => result.current.setChosenTodo(todoToUpdate));
    act(() => result.current.update(updatedTodo));

    expect(result.current.todos.indexOf(updatedTodo)).toBe(1);
  });

  it('should clean chosen todo on cancel update', () => {
    const { result } = renderHook(() => useTodoApp());
    act(() => result.current.setChosenTodo(result.current.todos[1]));

    act(() => result.current.cancelUpdate());

    expect(result.current.chosenTodo).toBeFalsy();
  });
});