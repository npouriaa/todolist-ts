export interface Item {
  id: string;
  todo: string;
  checked: boolean;
}

export default class TodoItem implements Item {
  constructor(
    private _id: string = "",
    private _todo: string = "",
    private _checked: boolean = false
  ) {}

  //get and set for id
  get id(): string {
    return this._id;
  }
  set id(id: string) {
    this._id = id;
  }

  //get and set for todo
  get todo(): string {
    return this._todo;
  }
  set todo(todo: string) {
    this._todo = todo;
  }

  //get and set for checked
  get checked(): boolean {
    return this._checked;
  }
  set checked(checked: boolean) {
    this._checked = checked;
  }
}
