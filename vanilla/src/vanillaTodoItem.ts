import { Todo } from "./activeTodos";

const VanillaTodoItem = (todo: Todo, container: HTMLDivElement, onMarkActive?: () => void) => {
  const root = document.createElement('div');
  root.setAttribute('data-type', 'todo')
  const removeBtn = document.createElement('button');
  removeBtn.innerText = 'Remove';
  removeBtn.setAttribute('id', 'removeBtn');

  const removeTodo = () => {
    container.removeChild(root);
  }

  removeBtn.addEventListener('click', removeTodo);

  const text = document.createElement('div');
  text.innerHTML = `
    <div>
      <span>Title: ${todo.title} </div>
      <span>Id: ${todo.id} </div>
    </div>
  `;

  root.appendChild(text);
  root.appendChild(removeBtn);

  const activeBtn = document.createElement('button');
  activeBtn.setAttribute('id', 'setActiveBtn');
  activeBtn.addEventListener('click', () => {
    onMarkActive();
  });
  root.appendChild(activeBtn);

  container.appendChild(root);
}

export default VanillaTodoItem;
