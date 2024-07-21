import { v4 as uuidV4 } from "uuid";
import "./style.css";

const list = document.querySelector<HTMLUListElement>(".list");
const form = document.getElementById("new-task-form") as HTMLFormElement;
const input = document.querySelector<HTMLInputElement>("#new-task-title");
const tasks: Task[] = loadTasks();
tasks.forEach(addListItem)
type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input?.value === "" || input?.value === null) return;
  const newTask: Task = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date(),
  };
  addListItem(newTask);
  input.value = "";
  tasks.push(newTask);
  saveTasks();
});

function addListItem(task: Task) {
  const item = document.createElement("li");
  const label = document.createElement("label");
  const checkBox = document.createElement("input");
  checkBox.addEventListener("change", () => {
    task.completed = checkBox.checked;
    saveTasks()
  });
  checkBox.type = "checkbox";
  checkBox.checked = task.completed;
  label.append(checkBox, task.title);
  item.append(label);
  list?.append(item);
}

function saveTasks() {
  localStorage.setItem("TASKS", JSON.stringify(tasks));
}

function loadTasks(): Task[] {
  const taskJson = localStorage.getItem("TASKS");
  if (taskJson == null) return [];
  return JSON.parse(localStorage.getItem("TASKS"));
}
