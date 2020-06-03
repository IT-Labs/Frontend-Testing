import { getTodos } from './todoService';
import VanillaTodoItem from './vanillaTodoItem';

export const TodosList = (container: HTMLDivElement) => {
  const todos = getTodos();

  const root = document.createElement('div');

  todos.forEach((todo) => {
    VanillaTodoItem(todo, root);
  });

  container.appendChild(root);
}