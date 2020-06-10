import React from 'react';
import { render, screen, act, fireEvent, } from '@testing-library/react';
import TodoItem from './TodoItem';
import { TodoItemProps } from './TodoItem';
import { Todo } from './Todo';

describe('TodoItem', () => {
  const getTodo = () => ({
    id: '1',
    title: 'Wash the dishes',
    isCompleted: false,
    createdAt: '2020-06-02T12:20:56.512Z',
  } as Todo)
  const getProps = (props: Partial<TodoItemProps> = {}) => ({
    todo: getTodo(),
    onEdit: jest.fn(),
    onRemove: jest.fn(),
    ...props,
  } as TodoItemProps);

  it('should render correctly', () => {
    const props = getProps();
    render(<TodoItem  {...props} />)
  });

  it('should render todo name', () => {
    const props = getProps();
    render(<TodoItem  {...props} />);

    expect(screen.getByText(props.todo.title)).toBeTruthy();
  });

  it('should render created date', () => {
    const props = getProps();
    render(<TodoItem  {...props} />);

    expect(screen.getByText('Jun 2, 2020')).toBeTruthy();
  });

  it('should render "Done" when todo completed', () => {
    const todo = getTodo();
    todo.isCompleted = true;
    const props = getProps({ todo });
    render(<TodoItem  {...props} />);

    expect(screen.getByText('Done')).toBeTruthy();
  });

  it('should render "Pending" when todo not completed', () => {
    const todo = getTodo();
    todo.isCompleted = false;
    const props = getProps({ todo });
    render(<TodoItem  {...props} />);

    expect(screen.getByText('Pending')).toBeTruthy();
  });

  it('should render Remove btn', () => {
    const props = getProps();
    render(<TodoItem  {...props} />);

    expect(screen.getByText('Remove')).toBeTruthy();
  });

  it('Should render Edit btn', () => {
    const props = getProps();
    render(<TodoItem  {...props} />);

    expect(screen.getByText('Edit')).toBeTruthy();
  });

  it('should emit onEdit cb on Edit btn click', () => {
    const props = getProps();
    render(<TodoItem  {...props} />);

    fireEvent.click(screen.getByText('Edit'));

    expect(props.onEdit).toHaveBeenCalled();
  });

  it('should emit onRemove cb on Remove btn click', () => {
    const props = getProps();
    render(<TodoItem  {...props} />);

    fireEvent.click(screen.getByText('Remove'));

    expect(props.onRemove).toHaveBeenCalled();
  });
});
