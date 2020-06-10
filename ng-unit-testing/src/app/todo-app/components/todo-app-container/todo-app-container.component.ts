import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-app-container',
  templateUrl: './todo-app-container.component.html',
  styleUrls: ['./todo-app-container.component.css']
})
export class TodoAppContainerComponent implements OnInit {

  constructor(public todoService: TodoService) { }

  ngOnInit() {
  }

}
