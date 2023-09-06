import TodoItem from "./TodoItem";

interface List {
  list: TodoItem[];
  load(): void;
  save(): void;
  clearList(): void;
  addTodo(todoObj: TodoItem): void;
  removeTodo(id: string): void;
}

export default class FullTodos implements List {
  static instance: FullTodos = new FullTodos();

  private constructor(private _list: TodoItem[] = []) {}

  get list(): TodoItem[] {
    return this._list;
  }

  load(): void {
    const storedTodos: string | null = localStorage.getItem("myTodos");
    if (typeof storedTodos !== "string") return;
    const parsedTodos: { _id: string; _item: string; _checked: boolean }[] =
      JSON.parse(storedTodos);

    parsedTodos.forEach((todoObj) => {
      const newTodoItem = new TodoItem(
        todoObj._id,
        todoObj._item,
        todoObj._checked
      );
      FullTodos.instance.addTodo(newTodoItem);
    });
  }

  save(): void {
    localStorage.setItem("myTodos", JSON.stringify(this._list));
  }

  clearList(): void {
    this._list = [];
    this.save();
  }

  addTodo(todoObj: TodoItem): void {
    this._list.push(todoObj);
    this.save();
  }

  removeTodo(id: string): void {
    this._list = this._list.filter((todo) => todo.id !== id);
    this.save();
  }
}
