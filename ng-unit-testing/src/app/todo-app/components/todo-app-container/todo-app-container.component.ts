import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/Todo';

@Component({
  selector: 'app-todo-app-container',
  templateUrl: './todo-app-container.component.html',
  styleUrls: ['./todo-app-container.component.css']
})
export class TodoAppContainerComponent implements OnInit {

  constructor(public todoService: TodoService) { }

  ngOnInit() {
    this.todoService.getAllTodos().subscribe();
  }

  handleDelete(todo: Todo) {
    this.todoService.remove(todo).subscribe(() => {
      console.log('Todo removed message');
    })
  }

  handleUpdate(todo: Todo) {
    this.todoService.update(todo).subscribe(() => {
      console.log('Todo updated message');
    });
  }

}
