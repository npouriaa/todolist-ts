import ListItem from "./ListItem";

interface List {
  list: ListItem[];
  load(): void;
  save(): void;
  clearList(): void;
  addTodo(todoObj: ListItem): void;
  removeTodo(id: string): void;
}

export default class FullList implements List {
  static instance: FullList = new FullList();

  private constructor(private _list: ListItem[] = []) {}

  get list(): ListItem[] {
    return this._list;
  }

  load(): void {
    const storedTodos: string | null = localStorage.getItem("myTodos");
    if (typeof storedTodos !== "string") return;
    const parsedTodos: { _id: string; _item: string; _checked: boolean }[] =
      JSON.parse(storedTodos);

    parsedTodos.forEach((todoObj) => {
      const newTodoItem = new ListItem(
        todoObj._id,
        todoObj._item,
        todoObj._checked
      );
      FullList.instance.addTodo(newTodoItem);
    });
  }

  save(): void {
    localStorage.setItem("myTodos", JSON.stringify(this._list));
  }

  clearList(): void {
    this._list = [];
    this.save();
  }

  addTodo(todoObj: ListItem): void {
    this._list.push(todoObj);
    this.save();
  }

  removeTodo(id: string): void {
    this._list = this._list.filter((todo) => todo.id !== id);
    this.save();
  }
}
