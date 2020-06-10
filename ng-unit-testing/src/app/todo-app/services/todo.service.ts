import { Injectable } from '@angular/core';
import { Todo } from '../models/Todo';
import { BehaviorSubject } from 'rxjs';

const initialTodos: Todo[] = [
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

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private _todos = new BehaviorSubject<Todo[]>(initialTodos);
  todos = this._todos.asObservable();

  private _chosenTodo = new BehaviorSubject<Todo>(null);
  chosenTodo = this._chosenTodo.asObservable();

  constructor() { }

  update(todo: Todo) {
    if (!todo) {
      return;
    }

    const oldTodos = this._todos.value;
    const oldTodo = oldTodos.find((t) => t.id === todo.id);
    if (!oldTodo) {
      this._todos.next([...oldTodos, todo]);
      this._chosenTodo.next(null);
      return;
    }

    const index = oldTodos.indexOf(oldTodo);
    const updatedTodos = [
      ...oldTodos,
    ];
    updatedTodos[index] = todo;
    this._todos.next(updatedTodos);

    this._chosenTodo.next(null);
  }

  remove(todo: Todo) {
    const oldTodos = this._todos.value;
    this._todos.next(oldTodos.filter((t) => t !== todo));

    if (this._chosenTodo.value === todo) {
      this._chosenTodo.next(null);
    }
  }

  cancelUpdate() {
    this._chosenTodo.next(null);
  }

  onAdd() {
    this._chosenTodo.next({
      id: Math.random().toString(),
      title: '',
      createdAt: new Date().toString(),
      isCompleted: false,
    })
  }

  setChosenTodo(todo: Todo) {
    this._chosenTodo.next(todo);
  }
}
