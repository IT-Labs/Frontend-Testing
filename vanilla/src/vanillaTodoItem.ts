import { Todo } from "./activeTodos";

const VanillaTodoItem = (todo: Todo, container: HTMLDivElement) => {
  const root = document.createElement('div');
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

  container.appendChild(root);
}

export default VanillaTodoItem;
