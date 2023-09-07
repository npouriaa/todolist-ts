import FullTodos from "../model/FullTodos";

interface DOMTodos {
  ul: HTMLUListElement;
  clear(): void;
  render(fullTodos: FullTodos): void;
}

export default class TodosTemplate implements DOMTodos {
  ul: HTMLUListElement;
  static instance: TodosTemplate = new TodosTemplate();
  private constructor() {
    this.ul = document.querySelector("ul") as HTMLUListElement;
  }
  clear(): void {
    this.ul.innerHTML = "";
  }

  render(fullTodos: FullTodos): void {
    this.clear();

    fullTodos.todos.forEach((todo) => {
      const li = document.createElement("li") as HTMLLIElement;

      const check = document.createElement("input") as HTMLInputElement;
      check.type = "checkbox";
      check.id = todo.id;
      check.checked = todo.checked;
      check.className = "checkbox";
      const checkboxCon = document.createElement("div") as HTMLDivElement;
      checkboxCon.className = "checkbox-con";
      const span = document.createElement("span") as HTMLSpanElement;
      checkboxCon.append(check);
      checkboxCon.append(span);
      li.append(checkboxCon);

      check.addEventListener("change", () => {
        todo.checked = !todo.checked;
        fullTodos.save();
      });

      const todoText = document.createElement("div") as HTMLDivElement;
      todoText.className = "todo-text";
      todoText.textContent = todo.todo;
      li.append(todoText);

      const removeBtn = document.createElement("button") as HTMLButtonElement;
      removeBtn.className = "remove-todo-btn";
      removeBtn.innerHTML = `
      <svg
         xmlns="http://www.w3.org/2000/svg"
         fill="none"
         viewBox="0 0 24 24"
         stroke-width="1.5"
         stroke="currentColor"
         class="w-6 h-6"
        >
         <path
         stroke-linecap="round"
         stroke-linejoin="round"
         d="M6 18L18 6M6 6l12 12"
        />
       </svg>`;
      li.append(removeBtn);

      removeBtn.addEventListener("click", () => {
        fullTodos.removeTodo(todo.id);
        this.render(fullTodos);
      });

      this.ul.append(li);
    });
  }
}
