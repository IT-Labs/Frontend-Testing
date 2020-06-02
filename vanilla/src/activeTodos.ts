export interface Todo {
  id: string;
  title: string;
  isActive: boolean;
}

const findActiveTodos = (todos: Todo[]) => {
  return todos.find(todo => todo.isActive === true);
}

export default findActiveTodos;
