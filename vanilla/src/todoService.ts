import { Todo } from './activeTodos';

export const getTodos: () => Todo[] = () => {
  return [
    {id: '3', title: 'kom', isActive: false},
    {id: '1', title: 'abc', isActive: true},
    {id: '2', title: 'efg', isActive: false},
  ]
}
