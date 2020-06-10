import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../../models/Todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  @Input() todos: Todo[];
  @Output() onEdit = new EventEmitter<Todo>();
  @Output() onRemove = new EventEmitter<Todo>();

  constructor() { }

  ngOnInit() {
  }

}
