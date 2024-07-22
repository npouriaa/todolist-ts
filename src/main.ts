import { v4 as uuidV4 } from "uuid";

const list = document.querySelector<HTMLUListElement>(".list");
const form = document.getElementById("new-task-form") as HTMLFormElement;
const input = document.querySelector<HTMLInputElement>("#new-task-title");
const tasks: Task[] = loadTasks();
tasks.forEach(addListItem);
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
  const div = document.createElement("div");
  const label = document.createElement("label");
  const deleteBtn = document.createElement("button");
  deleteBtn.addEventListener("click", () => {
    const filteredArray = loadTasks().filter((i) => i.id !== task.id);
    saveTasks(filteredArray);
    list?.removeChild(item);
  });
  const checkBox = document.createElement("input");
  checkBox.addEventListener("change", () => {
    task.completed = checkBox.checked;
    saveTasks();
  });
  checkBox.type = "checkbox";
  checkBox.checked = task.completed;
  deleteBtn.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="red">
   <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
  </svg>
`;
  label.append(checkBox, task.title);
  div.append(label, deleteBtn);
  item.append(div);
  list?.append(item);
}

function saveTasks(tasksArray = tasks) {
  localStorage.setItem("TASKS", JSON.stringify(tasksArray));
  loadTasks();
}

function loadTasks(): Task[] {
  const taskJson = localStorage.getItem("TASKS");
  if (taskJson == null) return [];
  return JSON.parse(localStorage.getItem("TASKS"));
}
