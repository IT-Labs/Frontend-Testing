import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { Todo } from './Todo';
import ChosenTodoForm, { ChosenTodoFormProps } from './ChosenTodoForm';

describe('ChosenTodoForm', () => {
  const getTodo = () => ({
    id: '1',
    title: 'Wash the dishes',
    isCompleted: false,
    createdAt: '2020-06-02T12:20:56.512Z',
  } as Todo)
  function getProps(props: Partial<ChosenTodoFormProps> = {}): ChosenTodoFormProps {
    return {
      chosenTodo: getTodo(),
      onCancelUpdate: jest.fn(),
      onUpdate: jest.fn(),
      ...props,
    };
  }

  it('should render correctly', () => {
    const props = getProps();
    render(<ChosenTodoForm {...props} />)
  });

  it('should render title input', () => {
    const props = getProps();
    render(<ChosenTodoForm {...props} />);

    expect(screen.getByLabelText('Title')).toBeTruthy();
  });

  it('should render save btn', () => {
    const props = getProps();
    render(<ChosenTodoForm {...props} />);

    expect(screen.getByText('Save')).toBeTruthy();
  });

  it('should render cancel btn', () => {
    const props = getProps();
    render(<ChosenTodoForm {...props} />);

    expect(screen.getByText('Cancel')).toBeTruthy();
  });

  it('should set initial input value of chosen todo', () => {
    const props = getProps();
    render(<ChosenTodoForm {...props} />);

    const input = screen.getByLabelText('Title') as HTMLInputElement;

    expect(input.value).toBe(props.chosenTodo.title);
  });

  it('should emit onUpdate cb when Save btn is clicked', () => {
    const props = getProps();
    render(<ChosenTodoForm {...props} />);

    fireEvent.click(screen.getByText('Save'));
    expect(props.onUpdate).toHaveBeenCalled();
  });

  it('should emit onCancel cb when Cancel btn is clicked', () => {
    const props = getProps();
    render(<ChosenTodoForm {...props} />);

    fireEvent.click(screen.getByText('Cancel'));
    expect(props.onCancelUpdate).toHaveBeenCalled();
  });

  it('should validate title required', async () => {
    const props = getProps();
    render(<ChosenTodoForm {...props} />);

    const input = screen.getByLabelText('Title') as HTMLInputElement;
    userEvent.clear(input);
    fireEvent.click(screen.getByText('Save'));
    expect(props.onUpdate).not.toHaveBeenCalled();
    expect(screen.getByText('Field is required')).toBeInTheDocument();
  });

  it('should validate success when title is valid', () => {
    const props = getProps();
    render(<ChosenTodoForm {...props} />);

    fireEvent.input(screen.getByLabelText('Title'), 'some value');
    fireEvent.click(screen.getByText('Save'));
    expect(props.onUpdate).toHaveBeenCalled();
    expect(() => screen.getByText('Field is required')).toThrow();
  });


  it('should not show validation error initially', () => {
    const chosenTodo = getTodo();
    chosenTodo.title = '';
    const props = getProps({ chosenTodo });
    render(<ChosenTodoForm {...props} />);

    expect(() => screen.getByText('Field is required')).toThrow();
  });

  it('should show validation error on input blur', () => {
    const chosenTodo = getTodo();
    chosenTodo.title = '';
    const props = getProps({ chosenTodo });
    render(<ChosenTodoForm {...props} />);

    const input = screen.getByLabelText('Title');
    fireEvent.focus(input);
    fireEvent.blur(input);

    expect(screen.getByText('Field is required')).toBeInTheDocument();
  });

  it('should show validation error on submit', () => {
    const chosenTodo = getTodo();
    chosenTodo.title = '';
    const props = getProps({ chosenTodo });
    render(<ChosenTodoForm {...props} />);

    expect(() => screen.getByText('Field is required')).toThrow();

    fireEvent.click(screen.getByText('Save'));

    expect(screen.getByText('Field is required')).toBeInTheDocument();
  })
})