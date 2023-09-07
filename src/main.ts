import "./css/style.css";
import FullTodos from "./model/FullTodos";
import TodoItem from "./model/TodoItem";
import TodosTemplate from "./templates/TodosTemplate";

const initApp = (): void => {
  const fullTodos = FullTodos.instance;
  const template = TodosTemplate.instance;

  const todoEntryForm = document.querySelector("form") as HTMLFormElement;
  todoEntryForm.addEventListener("submit", (event: SubmitEvent): void => {
    event.preventDefault();
    const addInput = document.querySelector(".add-input") as HTMLInputElement;
    const newEntryText: string = addInput.value.trim();
    if (!newEntryText.length) return;

    const todoId: number = fullTodos.todos.length
      ? parseInt(fullTodos.todos[fullTodos.todos.length - 1].id) + 1
      : 1;

    const newTodo = new TodoItem(todoId.toString(), newEntryText);
    fullTodos.addTodo(newTodo);
    template.render(fullTodos);
    addInput.value = "";
  });

  const clearTodos = document.querySelector(".clear-btn") as HTMLButtonElement;
  clearTodos.addEventListener("click", (): void => {
    fullTodos.clearList();
    template.clear();
  });

  fullTodos.load();
  template.render(fullTodos);
};

document.addEventListener("DOMContentLoaded", initApp);
