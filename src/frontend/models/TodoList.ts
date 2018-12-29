import axios from "axios";
import { TodoListItem } from "./interfaces";
import { loadables, loadable, LoadableType } from "./loadables";

export type TaskState = "UNDEFINED" | "RUNNING" | "LOADED" | "ERROR";
export enum SortOrder {
  ASC = "asc",
  DESC = "desc"
}

const sortFn = (order: SortOrder) => (a: TodoListItem, b: TodoListItem) => {
  if (order === SortOrder.ASC) return a.id - b.id;
  return b.id - a.id;
};

/*
async function getItems2<
  T extends { [K in keyof T]: R } & { [K2 in keyof T]: TaskState },
  R,
  K extends keyof T,
  K2 extends keyof T
>(obj: T, key: K, stateKey: K2) {
  console.log("async ext getItems2 called...");
  if (obj[stateKey] === "RUNNING") return;
  try {
    obj[stateKey] = "RUNNING";
    obj[key] = (await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    )).data;
    obj[stateKey] = "LOADED";
  } catch (e) {
    obj[stateKey] = "ERROR";
  }
}
*/

/*
async function getItems(obj: TodoList) {
  console.log("async ext getItems called...");
  if (obj.state === "RUNNING") return;
  try {
    obj.state = "RUNNING";
    obj.items = (await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    )).data;
    obj.state = "LOADED";
  } catch (e) {
    obj.state = "ERROR";
    obj.stateError = e;
  }
}
*/

/**
 * @redux true
 */
export class TodoList extends loadables {
  items: TodoListItem[] = [];
  state: TaskState = "UNDEFINED";
  stateError: any;
  sortOrder: SortOrder = SortOrder.ASC;
  listStart = 0;
  listPageLength = 10;
  listTitle = "Title of TODO -list";

  // Example of memoized list using reselect
  get listToDisplay(): TodoListItem[] {
    return this.items
      .filter(item => item.completed)
      .sort(sortFn(this.sortOrder))
      .slice(this.listStart, this.listStart + this.listPageLength);
  }

  protected findMaxId(): number {
    let max = 0;
    this.items.forEach(item => {
      if (item.id > max) max = item.id;
    });
    return max;
  }
  nextPage() {
    this.listStart += this.listPageLength;
  }
  prevPage() {
    this.listStart -= this.listPageLength;
    if (this.listStart < 0) this.listStart = 0;
  }
  toggleSortOrder() {
    this.sortOrder =
      this.sortOrder == SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC;
  }
  clearTodoList() {
    this.items = [];
  }
  reverse() {
    this.items.reverse();
  }
  sortById() {
    this.items.sort((a, b) => a.id - b.id);
  }
  sortByTitle() {
    this.items.sort((a, b) => a.title.localeCompare(b.title));
  }
  sortByCompletion() {
    const toNumber = (value: boolean): number => (value ? 1 : 0);
    this.items.sort((a, b) => toNumber(a.completed) - toNumber(b.completed));
  }
  setTitle(value: string) {
    this.listTitle = value;
  }
  addLotOfItems(cnt: number) {
    const maxId = this.findMaxId();
    for (let i = 0; i < cnt; i++) {
      this.items.push({
        id: i + maxId,
        userId: 123 + i,
        completed: Math.random() > 0.5 ? true : false,
        title: "New Task " + i
      });
    }
  }
  /**
   * Fetch items from json placeholder service
   */
  async getItems() {
    await this.loadItems(
      this,
      "items",
      async () =>
        (await axios.get("https://jsonplaceholder.typicode.com/todos")).data,
      items => (this.items = items)
    );
  }
}
