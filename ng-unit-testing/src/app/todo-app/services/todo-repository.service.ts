import { Injectable } from '@angular/core';
import { Todo } from '../models/Todo';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const apiUrl = 'http://localhost:3001';

@Injectable({
  providedIn: 'root'
})
export class TodoRepositoryService {

constructor(private http: HttpClient) { }

  getTodos(): Observable<Todo[]> {
  return this.http.get<Todo[]>(apiUrl + '/todos');
}

  addTodo(todo: Partial<Todo>): Observable<Todo> {
  return this.http.post<Todo>(apiUrl + '/todos', todo);;
}

  updateTodo(id: string, todo: Todo): Observable<Todo> {
  return this.http.put<Todo>(`${apiUrl}/todos/${id}`, todo);
}

  deleteTodo(id: string): Observable<{}> {
    return this.http.delete<{}>(`${apiUrl}/todos/${id}`);
  }
}
