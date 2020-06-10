import React from 'react';
import { render, screen } from '@testing-library/react';
import TodoList from './TodoList';
import { TodoListProps } from './TodoList';

describe('TodoList', () => {
  const getTodos = () => [
    {
      id: '1',
      title: 'Wash the dishes',
      isCompleted: false,
      createdAt: '2020-06-02T12:20:56.512Z',
    },
    {
      id: '2',
      title: 'Clean your PC',
      isCompleted: false,
      createdAt: '2020-05-20T12:20:56.512Z',
    },
    {
      id: '3',
      title: 'Go biking',
      isCompleted: true,
      createdAt: '2020-05-10T12:20:56.512Z',
    },
  ];

  const getProps = (props: Partial<TodoListProps> = {}) => ({
    todos: getTodos(),
    onEdit: jest.fn(),
    onRemove: jest.fn(),
  } as TodoListProps);

  it('should render correctly', () => {
    const props = getProps();
    render(<TodoList {...props} />)
  });

  it('should render all todos', () => {
    const props = getProps();
    render(<TodoList {...props} />)

    const renderedTodos = screen.getAllByTestId('todoitem');

    expect(renderedTodos).toHaveLength(props.todos.length);
  });
});