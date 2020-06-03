import { Todo } from './activeTodos';

const sortActiveTodos = (getTodos: (howMany: number) => Todo[]) => {
  const howMany = doMagicAncCalcHowMany()
  const todos = getTodos(howMany);

  return [...todos].sort((a, b) => a.title.localeCompare(b.title));
}

const doMagicAncCalcHowMany = () => {
  return 5;
}

export default sortActiveTodos;