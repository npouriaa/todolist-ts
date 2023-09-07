import TodoItem from "./TodoItem";

interface Todos {
  todos: TodoItem[];
  load(): void;
  save(): void;
  clearList(): void;
  addTodo(todoObj: TodoItem): void;
  removeTodo(id: string): void;
}

export default class FullTodos implements Todos {
  static instance: FullTodos = new FullTodos();
  constructor(private _todos: TodoItem[] = []) {}

  get todos(): TodoItem[] {
    return this._todos;
  }

  load(): void {
    const storedTodos: string | null = localStorage.getItem("myTodos");
    if (typeof storedTodos !== "string") return;
    const parsedTodos: { _id: string; _todo: string; _checked: boolean }[] =
      JSON.parse(storedTodos);
    parsedTodos.forEach((todoObj) => {
      const newTodoItem = new TodoItem(
        todoObj._id,
        todoObj._todo,
        todoObj._checked
      );
      FullTodos.instance.addTodo(newTodoItem);
    });
  }

  save(): void {
    localStorage.setItem("myTodos", JSON.stringify(this._todos));
  }

  clearList(): void {
    this._todos = [];
    this.save();
  }

  addTodo(todoObj: TodoItem): void {
    this._todos.push(todoObj);
    this.save();
  }

  removeTodo(id: string): void {
    this._todos = this._todos.filter((todo) => todo.id !== id);
    this.save();
  }
}
