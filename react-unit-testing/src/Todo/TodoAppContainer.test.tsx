import React from 'react';
import { render, screen, act, fireEvent, waitForElement } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoAppContainer from './TodoAppContainer'
import { getTodos, updateTodo, addTodo, deleteTodo } from './todoApi';
import { Todo } from './Todo';

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

const mockGetTodos = getTodos as jest.Mock<any>;
const mockUpdateTodo = updateTodo as jest.Mock<any>;
const mockAddTodo = addTodo as jest.Mock<any>;
const mockDeleteTodo = deleteTodo as jest.Mock<any>;

describe.only('TodoAppContainer', () => {
  beforeEach(() => {
    mockGetTodos.mockReset();
    mockGetTodos.mockResolvedValue(mockTodos());
    mockDeleteTodo.mockResolvedValue(null);
  });

  it('should render correctly', async () => {
    render(<TodoAppContainer />);

    await act(() => Promise.resolve());
  });

  it('should render title', async () => {
    render(<TodoAppContainer />);

    await act(() => Promise.resolve());

    expect(screen.getByText('Todo App')).toBeInTheDocument();
  })

  it('should render list of todos from api', async () => {
    render(<TodoAppContainer />);
    const todos = mockTodos();

    await act(() => Promise.resolve());

    const todoRows = screen.getAllByTestId('todoitem');
    expect(todoRows).toHaveLength(3);
    expect(todoRows[0].textContent).toContain(todos[0].title);
    expect(todoRows[1].textContent).toContain(todos[1].title);
    expect(todoRows[2].textContent).toContain(todos[2].title);
  });

  it('should create new todo', async () => {
    const todoTitle = 'my new todo title';
    mockAddTodo.mockResolvedValue({ 
      id: Math.random().toString(), title: todoTitle, createdAt: new Date().toJSON(), isCompleted: false 
    } as Todo);
    render(<TodoAppContainer />);
    await act(() => Promise.resolve());

    fireEvent.click(screen.getByText('Add'));
    await act(() => userEvent.type(screen.getByLabelText('Title'), todoTitle));
    fireEvent.click(screen.getByText('Save'));

    await waitForElement(() => screen.getByText(todoTitle));
    expect(mockAddTodo).toHaveBeenCalled();
    expect(screen.getAllByTestId('todoitem')).toHaveLength(4);
  });
})