import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../../models/Todo';

@Component({
  selector: 'app-todo-app',
  templateUrl: './todo-app.component.html',
  styleUrls: ['./todo-app.component.css']
})
export class TodoAppComponent implements OnInit {
  @Input() todos: Todo[];
  @Input() chosenTodo: Todo;
  @Output() onEdit = new EventEmitter<Todo>();
  @Output() onRemove = new EventEmitter<Todo>();
  @Output() onUpdate = new EventEmitter<Todo>();
  @Output() onCancelUpdate = new EventEmitter<void>();
  @Output() onAdd = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

}
