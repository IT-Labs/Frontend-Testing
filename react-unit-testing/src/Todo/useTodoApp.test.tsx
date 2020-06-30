import { renderHook, act } from '@testing-library/react-hooks';
import useTodoApp from './useTodoApp';
import { Todo } from './Todo';
import { getTodos, updateTodo, addTodo, deleteTodo } from './todoApi';

jest.mock('./todoApi');

const mockTodos = () => [
  {
    "id": "1",
    "title": "Wash the dishes",
    "isCompleted": false,
    "createdAt": "2020-06-02T12:20:56.512Z"
  },
  {
    "id": "2",
    "title": "Clean your PC",
    "isCompleted": false,
    "createdAt": "2020-05-20T12:20:56.512Z"
  },
  {
    "id": "3",
    "title": "Go biking",
    "isCompleted": true,
    "createdAt": "2020-05-10T12:20:56.512Z"
  }
];

describe('useTodoApp', () => {
  function getTodo(): Todo {
    return {
      id: '1',
      title: 'Wash the dishes',
      isCompleted: false,
      createdAt: '2020-06-02T12:20:56.512Z',
    }
  }

  const mockGetTodos = getTodos as jest.Mock<any>;
  const mockUpdateTodo = updateTodo as jest.Mock<any>;
  const mockAddTodo = addTodo as jest.Mock<any>;
  const mockDeleteTodo = deleteTodo as jest.Mock<any>;

  beforeEach(() => {
    mockGetTodos.mockReset();
    mockGetTodos.mockResolvedValue(mockTodos());
    mockDeleteTodo.mockResolvedValue(null);
  });

  it('should render correctly', async () => {
    renderHook(() => useTodoApp());
    await act(() => Promise.resolve());
  });

  it('should set initial todos', async () => {
    const { result } = renderHook(() => useTodoApp());

    await act(() => Promise.resolve());

    expect(result.current.todos).toHaveLength(3);
  });

  it('should not have chosen item initially', async () => {
    const { result } = renderHook(() => useTodoApp());

    await act(() => Promise.resolve());

    expect(result.current.chosenTodo).toBeFalsy();
  });

  it('should set chosen item', async () => {
    const { result } = renderHook(() => useTodoApp());
    const newChosenTodo = getTodo();

    await act(() => Promise.resolve());

    act(() => result.current.setChosenTodo(newChosenTodo));
    expect(result.current.chosenTodo).toBe(newChosenTodo);
  });

  it('should set new chosen item onAdd', async () => {
    const { result } = renderHook(() => useTodoApp());
    
    await act(() => Promise.resolve());

    act(() => result.current.onAdd());

    expect(result.current.chosenTodo).toBeTruthy();
    expect(result.current.todos).not.toContain(result.current.chosenTodo);
  });

  it('should remove todo', async () => {
    const { result } = renderHook(() => useTodoApp());
    
    await act(() => Promise.resolve());
    
    const currentLength = result.current.todos.length;
    const todoToRemove = result.current.todos[1];

    await act(() => result.current.remove(todoToRemove));

    expect(result.current.todos).not.toContain(todoToRemove);
    expect(result.current.todos).toHaveLength(currentLength - 1);
  });

  it('should update existing todo', async () => {
    const { result } = renderHook(() => useTodoApp());
    await act(() => Promise.resolve());

    const todoToUpdate = result.current.todos[1];
    const updatedTodo: Todo = {...todoToUpdate, title: 'some changed value'};
    mockUpdateTodo.mockResolvedValue(updatedTodo);

    act(() => result.current.setChosenTodo(todoToUpdate));
    await act(() => result.current.update(updatedTodo));

    expect(result.current.todos).not.toContain(todoToUpdate);
    expect(result.current.todos).toContain(updatedTodo);
    expect(result.current.todos.indexOf(updatedTodo)).toBe(1);
  });

  it('should keep same array index when todo is updated', async () => {
    const { result } = renderHook(() => useTodoApp());
    await act(() => Promise.resolve());

    const todoToUpdate = result.current.todos[1];
    const updatedTodo: Todo = {...todoToUpdate, title: 'some changed value'};
    mockUpdateTodo.mockResolvedValue(updatedTodo);

    act(() => result.current.setChosenTodo(todoToUpdate));
    await act(() => result.current.update(updatedTodo));

    expect(result.current.todos.indexOf(updatedTodo)).toBe(1);
  });

  it('should clean chosen todo on cancel update', async () => {
    const { result } = renderHook(() => useTodoApp());
    await act(() => Promise.resolve());
    act(() => result.current.setChosenTodo(result.current.todos[1]));

    act(() => result.current.cancelUpdate());

    expect(result.current.chosenTodo).toBeFalsy();
  });
});