import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { format } from 'date-fns';
import { Todo } from '../../models/Todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit, OnChanges {
  @Input() todo: Todo;
  @Output() onEdit = new EventEmitter<Todo>();
  @Output() onRemove = new EventEmitter<Todo>();

  formatedTitle: string;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (!this.todo) {
      this.formatedTitle = '';
      return;
    }

    this.formatedTitle = format(new Date(this.todo.createdAt), 'MMM d, yyyy');
  }
}
