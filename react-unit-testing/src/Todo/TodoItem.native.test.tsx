import React from 'react';
import { unmountComponentAtNode, render } from "react-dom";
import { Todo } from './Todo';
import TodoItem from "./TodoItem";

describe('TodoItem-native', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
  });
  
  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  const getTodo = () => ({
    id: '1',
    title: 'Wash the dishes',
    isCompleted: false,
    createdAt: '2020-06-02T12:20:56.512Z',
  } as Todo);

  it('should show todo title', () => {
    const todo = getTodo();
    render(<TodoItem todo={todo} onEdit={jest.fn()} onRemove={jest.fn()} />, container);

    expect(container.textContent).toContain(todo.title);
  });
})