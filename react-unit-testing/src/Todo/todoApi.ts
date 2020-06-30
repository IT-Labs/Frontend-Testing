import axios from 'axios';
import { Todo } from './Todo';

const apiUrl = 'http://localhost:3001';

export function getTodos(): Promise<Todo[]> {
  return axios.get<Todo[]>(apiUrl + '/todos')
    .then(res => res.data);
}

export function addTodo(todo: Partial<Todo>): Promise<Todo> {
  return axios.post<Todo>(apiUrl + '/todos', todo)
    .then(res => res.data);
}

export function updateTodo(id: string, todo: Todo): Promise<Todo> {
  return axios.put<Todo>(`${apiUrl}/todos/${id}`, todo)
    .then(res => res.data);
}

export function deleteTodo(id: string): Promise<void> {
  return axios.delete(`${apiUrl}/todos/${id}`);
}