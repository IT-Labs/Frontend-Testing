import { Todo } from './activeTodos';
import axios from 'axios';

export const getTodos: () => Todo[] = () => {
  return [
    {id: '3', title: 'kom', isActive: false},
    {id: '1', title: 'abc', isActive: true},
    {id: '2', title: 'efg', isActive: false},
  ]
}

export const getTodosAsync: () => Promise<Todo[]> = () => {
  return axios.get('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.data);
}