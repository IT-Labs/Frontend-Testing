import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Todo } from '../../models/Todo';

@Component({
  selector: 'app-chosen-todo-form',
  templateUrl: './chosen-todo-form.component.html',
  styleUrls: ['./chosen-todo-form.component.css']
})
export class ChosenTodoFormComponent implements OnInit, OnChanges {
  @Input() chosenTodo: Todo;
  @Output() onUpdate = new EventEmitter<Todo>();
  @Output() onCancelUpdate = new EventEmitter<void>();

  form: FormGroup;

  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(this.chosenTodo ? this.chosenTodo.title : '', [Validators.required]),
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['chosenTodo'] && !changes.chosenTodo.firstChange) {
      this.form.reset({title: this.chosenTodo ? this.chosenTodo.title : ''})
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.onUpdate.emit({
      ...this.chosenTodo,
      title: this.form.get('title').value,
    });
  }
}
