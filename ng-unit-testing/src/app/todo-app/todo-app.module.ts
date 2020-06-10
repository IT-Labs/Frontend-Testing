import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoAppContainerComponent } from './components/todo-app-container/todo-app-container.component';
import { TodoAppComponent } from './components/todo-app/todo-app.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { ChosenTodoFormComponent } from './components/chosen-todo-form/chosen-todo-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    TodoAppContainerComponent,
    TodoAppComponent,
    TodoListComponent,
    TodoItemComponent,
    ChosenTodoFormComponent,
  ],
  exports: [
    TodoAppContainerComponent,
  ]
})
export class TodoAppModule { }
