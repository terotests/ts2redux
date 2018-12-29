/********************************************************************************
 *                                                                               *
 *   Redux Reducers and React Context API Provider/Consumer for state TodoList   *
 *   Generated by ts2redux from Source file ../TodoList.ts                       *
 *                                                                               *
 ********************************************************************************/

import axios from "axios";
import { TodoListItem } from "../interfaces";
import { loadables, loadable, LoadableType } from "../loadables";

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

import * as immer from "immer";
import { createSelector } from "reselect";
import { connect } from "react-redux";
import { IState } from "./index";
import * as React from "react";

export interface IContainerPropsMethods {
  nextPage: () => any;
  prevPage: () => any;
  toggleSortOrder: () => any;
  clearTodoList: () => any;
  reverse: () => any;
  sortById: () => any;
  sortByTitle: () => any;
  sortByCompletion: () => any;
  setTitle: (value: string) => any;
  addLotOfItems: (cnt: number) => any;
  getItems: () => any;
  initState: (name: string) => any;
  setLoadState: (
    opts: {
      name: string;
      state: TaskState;
    }
  ) => any;
  setData: (
    opts: {
      name: string;
      data: any;
    }
  ) => any;
  setError: (
    opts: {
      name: string;
      err: any;
    }
  ) => any;
}
export interface ITodoList {
  items: TodoListItem[];
  state: TaskState;
  stateError: any;
  sortOrder: SortOrder;
  listStart: number;
  listPageLength: number;
  listTitle: string;
  loadables: LoadableType;
}
export const itemsSelectorFn = (state: ITodoList): TodoListItem[] =>
  state.items;
export const stateSelectorFn = (state: ITodoList): TaskState => state.state;
export const stateErrorSelectorFn = (state: ITodoList): any => state.stateError;
export const sortOrderSelectorFn = (state: ITodoList): SortOrder =>
  state.sortOrder;
export const listStartSelectorFn = (state: ITodoList): number =>
  state.listStart;
export const listPageLengthSelectorFn = (state: ITodoList): number =>
  state.listPageLength;
export const listTitleSelectorFn = (state: ITodoList): string =>
  state.listTitle;
export const loadablesSelectorFn = (state: ITodoList): LoadableType =>
  state.loadables;
export const listToDisplaySelectorFnCreator = () =>
  createSelector(
    [
      itemsSelectorFn,
      sortOrderSelectorFn,
      listStartSelectorFn,
      listPageLengthSelectorFn
    ],
    (items, sortOrder, listStart, listPageLength) => {
      const o = new TodoList();
      o.items = items;
      o.sortOrder = sortOrder;
      o.listStart = listStart;
      o.listPageLength = listPageLength;
      return o.listToDisplay;
    }
  );
export const listToDisplaySelector = listToDisplaySelectorFnCreator();

export interface IContainerPropsState extends ITodoList {
  listToDisplay: TodoListItem[];
}
export interface IProps extends IContainerPropsState, IContainerPropsMethods {}
export const mapStateToProps = (state: IState): IContainerPropsState => {
  return {
    items: state.TodoList.items,
    state: state.TodoList.state,
    stateError: state.TodoList.stateError,
    sortOrder: state.TodoList.sortOrder,
    listStart: state.TodoList.listStart,
    listPageLength: state.TodoList.listPageLength,
    listTitle: state.TodoList.listTitle,
    loadables: state.TodoList.loadables,
    listToDisplay: listToDisplaySelector(state.TodoList)
  };
};
export const mapDispatchToProps = (dispatch: any): IContainerPropsMethods => {
  return {
    nextPage: () => {
      return dispatch(RTodoList.nextPage());
    },
    prevPage: () => {
      return dispatch(RTodoList.prevPage());
    },
    toggleSortOrder: () => {
      return dispatch(RTodoList.toggleSortOrder());
    },
    clearTodoList: () => {
      return dispatch(RTodoList.clearTodoList());
    },
    reverse: () => {
      return dispatch(RTodoList.reverse());
    },
    sortById: () => {
      return dispatch(RTodoList.sortById());
    },
    sortByTitle: () => {
      return dispatch(RTodoList.sortByTitle());
    },
    sortByCompletion: () => {
      return dispatch(RTodoList.sortByCompletion());
    },
    setTitle: (value: string) => {
      return dispatch(RTodoList.setTitle(value));
    },
    addLotOfItems: (cnt: number) => {
      return dispatch(RTodoList.addLotOfItems(cnt));
    },
    getItems: () => {
      return dispatch(RTodoList.getItems());
    },
    initState: (name: string) => {
      return dispatch(RTodoList.initState(name));
    },
    setLoadState: (opts: { name: string; state: TaskState }) => {
      return dispatch(RTodoList.setLoadState(opts));
    },
    setData: (opts: { name: string; data: any }) => {
      return dispatch(RTodoList.setData(opts));
    },
    setError: (opts: { name: string; err: any }) => {
      return dispatch(RTodoList.setError(opts));
    }
  };
};
export const StateConnector = connect(
  mapStateToProps,
  mapDispatchToProps
);

const initTodoList = () => {
  const o = new TodoList();
  return {
    items: o.items,
    state: o.state,
    stateError: o.stateError,
    sortOrder: o.sortOrder,
    listStart: o.listStart,
    listPageLength: o.listPageLength,
    listTitle: o.listTitle,
    loadables: o.loadables
  };
};
const initWithMethodsTodoList = () => {
  const o = new TodoList();
  return {
    items: o.items,
    state: o.state,
    stateError: o.stateError,
    sortOrder: o.sortOrder,
    listStart: o.listStart,
    listPageLength: o.listPageLength,
    listTitle: o.listTitle,
    loadables: o.loadables,
    nextPage: o.nextPage,
    prevPage: o.prevPage,
    toggleSortOrder: o.toggleSortOrder,
    clearTodoList: o.clearTodoList,
    reverse: o.reverse,
    sortById: o.sortById,
    sortByTitle: o.sortByTitle,
    sortByCompletion: o.sortByCompletion,
    setTitle: o.setTitle,
    addLotOfItems: o.addLotOfItems,
    getItems: o.getItems,
    initState: o.initState,
    setLoadState: o.setLoadState,
    setData: o.setData,
    setError: o.setError,
    listToDisplay: o.listToDisplay
  };
};

/**
 * @generated true
 */
export class RTodoList extends TodoList {
  private _state?: ITodoList;
  private _dispatch?: (action: any) => void;
  private _getState?: () => any;
  constructor(
    state?: ITodoList,
    dispatch?: (action: any) => void,
    getState?: () => any
  ) {
    super();
    this._state = state;
    this._dispatch = dispatch;
    this._getState = getState;
  }
  get items(): TodoListItem[] {
    if (this._getState) {
      return this._getState().TodoList.items;
    } else {
      if (this._state) {
        return this._state.items;
      }
    }
    throw "Invalid State in TodoList_items";
  }
  set items(value: TodoListItem[]) {
    if (this._state && typeof value !== "undefined") {
      this._state.items = value;
    } else {
      // dispatch change for item items
      if (this._dispatch) {
        this._dispatch({ type: TodoListEnums.TodoList_items, payload: value });
      }
    }
  }
  get state(): TaskState {
    if (this._getState) {
      return this._getState().TodoList.state;
    } else {
      if (this._state) {
        return this._state.state;
      }
    }
    throw "Invalid State in TodoList_state";
  }
  set state(value: TaskState) {
    if (this._state && typeof value !== "undefined") {
      this._state.state = value;
    } else {
      // dispatch change for item state
      if (this._dispatch) {
        this._dispatch({ type: TodoListEnums.TodoList_state, payload: value });
      }
    }
  }
  get stateError(): any {
    if (this._getState) {
      return this._getState().TodoList.stateError;
    } else {
      if (this._state) {
        return this._state.stateError;
      }
    }
    throw "Invalid State in TodoList_stateError";
  }
  set stateError(value: any) {
    if (this._state && typeof value !== "undefined") {
      this._state.stateError = value;
    } else {
      // dispatch change for item stateError
      if (this._dispatch) {
        this._dispatch({
          type: TodoListEnums.TodoList_stateError,
          payload: value
        });
      }
    }
  }
  get sortOrder(): SortOrder {
    if (this._getState) {
      return this._getState().TodoList.sortOrder;
    } else {
      if (this._state) {
        return this._state.sortOrder;
      }
    }
    throw "Invalid State in TodoList_sortOrder";
  }
  set sortOrder(value: SortOrder) {
    if (this._state && typeof value !== "undefined") {
      this._state.sortOrder = value;
    } else {
      // dispatch change for item sortOrder
      if (this._dispatch) {
        this._dispatch({
          type: TodoListEnums.TodoList_sortOrder,
          payload: value
        });
      }
    }
  }
  get listStart(): number {
    if (this._getState) {
      return this._getState().TodoList.listStart;
    } else {
      if (this._state) {
        return this._state.listStart;
      }
    }
    throw "Invalid State in TodoList_listStart";
  }
  set listStart(value: number) {
    if (this._state && typeof value !== "undefined") {
      this._state.listStart = value;
    } else {
      // dispatch change for item listStart
      if (this._dispatch) {
        this._dispatch({
          type: TodoListEnums.TodoList_listStart,
          payload: value
        });
      }
    }
  }
  get listPageLength(): number {
    if (this._getState) {
      return this._getState().TodoList.listPageLength;
    } else {
      if (this._state) {
        return this._state.listPageLength;
      }
    }
    throw "Invalid State in TodoList_listPageLength";
  }
  set listPageLength(value: number) {
    if (this._state && typeof value !== "undefined") {
      this._state.listPageLength = value;
    } else {
      // dispatch change for item listPageLength
      if (this._dispatch) {
        this._dispatch({
          type: TodoListEnums.TodoList_listPageLength,
          payload: value
        });
      }
    }
  }
  get listTitle(): string {
    if (this._getState) {
      return this._getState().TodoList.listTitle;
    } else {
      if (this._state) {
        return this._state.listTitle;
      }
    }
    throw "Invalid State in TodoList_listTitle";
  }
  set listTitle(value: string) {
    if (this._state && typeof value !== "undefined") {
      this._state.listTitle = value;
    } else {
      // dispatch change for item listTitle
      if (this._dispatch) {
        this._dispatch({
          type: TodoListEnums.TodoList_listTitle,
          payload: value
        });
      }
    }
  }
  get loadables(): LoadableType {
    if (this._getState) {
      return this._getState().TodoList.loadables;
    } else {
      if (this._state) {
        return this._state.loadables;
      }
    }
    throw "Invalid State in TodoList_loadables";
  }
  set loadables(value: LoadableType) {
    if (this._state && typeof value !== "undefined") {
      this._state.loadables = value;
    } else {
      // dispatch change for item loadables
      if (this._dispatch) {
        this._dispatch({
          type: TodoListEnums.TodoList_loadables,
          payload: value
        });
      }
    }
  }

  protected findMaxId(): number {
    let max = 0;
    this.items.forEach(item => {
      if (item.id > max) max = item.id;
    });
    return max;
  }
  nextPage() {
    if (this._state) {
      this.listStart += this.listPageLength;
    } else {
      if (this._dispatch) {
        this._dispatch({ type: TodoListEnums.TodoList_nextPage });
      }
    }
  }

  public static nextPage() {
    return (dispatcher: any, getState: any) => {
      new RTodoList(undefined, dispatcher, getState).nextPage();
    };
  }
  prevPage() {
    if (this._state) {
      this.listStart -= this.listPageLength;
      if (this.listStart < 0) this.listStart = 0;
    } else {
      if (this._dispatch) {
        this._dispatch({ type: TodoListEnums.TodoList_prevPage });
      }
    }
  }

  public static prevPage() {
    return (dispatcher: any, getState: any) => {
      new RTodoList(undefined, dispatcher, getState).prevPage();
    };
  }
  toggleSortOrder() {
    if (this._state) {
      this.sortOrder =
        this.sortOrder == SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC;
    } else {
      if (this._dispatch) {
        this._dispatch({ type: TodoListEnums.TodoList_toggleSortOrder });
      }
    }
  }

  public static toggleSortOrder() {
    return (dispatcher: any, getState: any) => {
      new RTodoList(undefined, dispatcher, getState).toggleSortOrder();
    };
  }
  clearTodoList() {
    if (this._state) {
      this.items = [];
    } else {
      if (this._dispatch) {
        this._dispatch({ type: TodoListEnums.TodoList_clearTodoList });
      }
    }
  }

  public static clearTodoList() {
    return (dispatcher: any, getState: any) => {
      new RTodoList(undefined, dispatcher, getState).clearTodoList();
    };
  }
  reverse() {
    if (this._state) {
      this.items.reverse();
    } else {
      if (this._dispatch) {
        this._dispatch({ type: TodoListEnums.TodoList_reverse });
      }
    }
  }

  public static reverse() {
    return (dispatcher: any, getState: any) => {
      new RTodoList(undefined, dispatcher, getState).reverse();
    };
  }
  sortById() {
    if (this._state) {
      this.items.sort((a, b) => a.id - b.id);
    } else {
      if (this._dispatch) {
        this._dispatch({ type: TodoListEnums.TodoList_sortById });
      }
    }
  }

  public static sortById() {
    return (dispatcher: any, getState: any) => {
      new RTodoList(undefined, dispatcher, getState).sortById();
    };
  }
  sortByTitle() {
    if (this._state) {
      this.items.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      if (this._dispatch) {
        this._dispatch({ type: TodoListEnums.TodoList_sortByTitle });
      }
    }
  }

  public static sortByTitle() {
    return (dispatcher: any, getState: any) => {
      new RTodoList(undefined, dispatcher, getState).sortByTitle();
    };
  }
  sortByCompletion() {
    if (this._state) {
      const toNumber = (value: boolean): number => (value ? 1 : 0);
      this.items.sort((a, b) => toNumber(a.completed) - toNumber(b.completed));
    } else {
      if (this._dispatch) {
        this._dispatch({ type: TodoListEnums.TodoList_sortByCompletion });
      }
    }
  }

  public static sortByCompletion() {
    return (dispatcher: any, getState: any) => {
      new RTodoList(undefined, dispatcher, getState).sortByCompletion();
    };
  }
  setTitle(value: string) {
    if (this._state) {
      this.listTitle = value;
    } else {
      if (this._dispatch) {
        this._dispatch({
          type: TodoListEnums.TodoList_setTitle,
          payload: value
        });
      }
    }
  }

  public static setTitle(value: string) {
    return (dispatcher: any, getState: any) => {
      new RTodoList(undefined, dispatcher, getState).setTitle(value);
    };
  }
  addLotOfItems(cnt: number) {
    if (this._state) {
      const maxId = this.findMaxId();
      for (let i = 0; i < cnt; i++) {
        this.items.push({
          id: i + maxId,
          userId: 123 + i,
          completed: Math.random() > 0.5 ? true : false,
          title: "New Task " + i
        });
      }
    } else {
      if (this._dispatch) {
        this._dispatch({
          type: TodoListEnums.TodoList_addLotOfItems,
          payload: cnt
        });
      }
    }
  }

  public static addLotOfItems(cnt: number) {
    return (dispatcher: any, getState: any) => {
      new RTodoList(undefined, dispatcher, getState).addLotOfItems(cnt);
    };
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

  public static getItems() {
    return (dispatcher: any, getState: any) => {
      new RTodoList(undefined, dispatcher, getState).getItems();
    };
  }
  initState(name: string) {
    if (this._state) {
      if (!this.loadables[name]) {
        this.loadables[name] = {
          data: null,
          state: "UNDEFINED",
          stateError: null
        };
      }
    } else {
      if (this._dispatch) {
        this._dispatch({
          type: TodoListEnums.TodoList_initState,
          payload: name
        });
      }
    }
  }

  public static initState(name: string) {
    return (dispatcher: any, getState: any) => {
      new RTodoList(undefined, dispatcher, getState).initState(name);
    };
  }
  setLoadState(opts: { name: string; state: TaskState }) {
    if (this._state) {
      if (!this.loadables[opts.name]) {
        this.loadables[opts.name] = {
          data: null,
          state: "UNDEFINED",
          stateError: null
        };
      }
      this.loadables[opts.name].state = opts.state;
    } else {
      if (this._dispatch) {
        this._dispatch({
          type: TodoListEnums.TodoList_setLoadState,
          payload: opts
        });
      }
    }
  }

  public static setLoadState(opts: { name: string; state: TaskState }) {
    return (dispatcher: any, getState: any) => {
      new RTodoList(undefined, dispatcher, getState).setLoadState(opts);
    };
  }
  setData(opts: { name: string; data: any }) {
    if (this._state) {
      this.loadables[opts.name].data = opts.data;
    } else {
      if (this._dispatch) {
        this._dispatch({ type: TodoListEnums.TodoList_setData, payload: opts });
      }
    }
  }

  public static setData(opts: { name: string; data: any }) {
    return (dispatcher: any, getState: any) => {
      new RTodoList(undefined, dispatcher, getState).setData(opts);
    };
  }
  setError(opts: { name: string; err: any }) {
    if (this._state) {
      this.loadables[opts.name].stateError = opts.err;
    } else {
      if (this._dispatch) {
        this._dispatch({
          type: TodoListEnums.TodoList_setError,
          payload: opts
        });
      }
    }
  }

  public static setError(opts: { name: string; err: any }) {
    return (dispatcher: any, getState: any) => {
      new RTodoList(undefined, dispatcher, getState).setError(opts);
    };
  }
  protected async loadItems<T extends loadable>(
    state: T,
    key: string,
    loader: () => Promise<any>,
    ready?: (data: any) => void
  ) {
    state.initState(key);
    const obj = state.loadables[key];
    if (obj.state === "RUNNING") return;
    try {
      state.setLoadState({ name: key, state: "RUNNING" });
      const data = await loader();
      // state.setData({ name: key, data });
      ready(data);
      state.setLoadState({ name: key, state: "LOADED" });
    } catch (e) {
      state.setLoadState({ name: key, state: "ERROR" });
      state.setError({ name: key, err: e });
    }
  }
}

export const TodoListEnums = {
  TodoList_items: "TodoList_items",
  TodoList_state: "TodoList_state",
  TodoList_stateError: "TodoList_stateError",
  TodoList_sortOrder: "TodoList_sortOrder",
  TodoList_listStart: "TodoList_listStart",
  TodoList_listPageLength: "TodoList_listPageLength",
  TodoList_listTitle: "TodoList_listTitle",
  TodoList_loadables: "TodoList_loadables",
  TodoList_findMaxId: "TodoList_findMaxId",
  TodoList_nextPage: "TodoList_nextPage",
  TodoList_prevPage: "TodoList_prevPage",
  TodoList_toggleSortOrder: "TodoList_toggleSortOrder",
  TodoList_clearTodoList: "TodoList_clearTodoList",
  TodoList_reverse: "TodoList_reverse",
  TodoList_sortById: "TodoList_sortById",
  TodoList_sortByTitle: "TodoList_sortByTitle",
  TodoList_sortByCompletion: "TodoList_sortByCompletion",
  TodoList_setTitle: "TodoList_setTitle",
  TodoList_addLotOfItems: "TodoList_addLotOfItems",
  TodoList_initState: "TodoList_initState",
  TodoList_setLoadState: "TodoList_setLoadState",
  TodoList_setData: "TodoList_setData",
  TodoList_setError: "TodoList_setError"
};

export const TodoListReducer = (
  state: ITodoList = initTodoList(),
  action: any
) => {
  return immer.produce(state, draft => {
    switch (action.type) {
      case TodoListEnums.TodoList_items:
        new RTodoList(draft).items = action.payload;
        break;
      case TodoListEnums.TodoList_state:
        new RTodoList(draft).state = action.payload;
        break;
      case TodoListEnums.TodoList_stateError:
        new RTodoList(draft).stateError = action.payload;
        break;
      case TodoListEnums.TodoList_sortOrder:
        new RTodoList(draft).sortOrder = action.payload;
        break;
      case TodoListEnums.TodoList_listStart:
        new RTodoList(draft).listStart = action.payload;
        break;
      case TodoListEnums.TodoList_listPageLength:
        new RTodoList(draft).listPageLength = action.payload;
        break;
      case TodoListEnums.TodoList_listTitle:
        new RTodoList(draft).listTitle = action.payload;
        break;
      case TodoListEnums.TodoList_loadables:
        new RTodoList(draft).loadables = action.payload;
        break;
      case TodoListEnums.TodoList_nextPage:
        new RTodoList(draft).nextPage();
        break;
      case TodoListEnums.TodoList_prevPage:
        new RTodoList(draft).prevPage();
        break;
      case TodoListEnums.TodoList_toggleSortOrder:
        new RTodoList(draft).toggleSortOrder();
        break;
      case TodoListEnums.TodoList_clearTodoList:
        new RTodoList(draft).clearTodoList();
        break;
      case TodoListEnums.TodoList_reverse:
        new RTodoList(draft).reverse();
        break;
      case TodoListEnums.TodoList_sortById:
        new RTodoList(draft).sortById();
        break;
      case TodoListEnums.TodoList_sortByTitle:
        new RTodoList(draft).sortByTitle();
        break;
      case TodoListEnums.TodoList_sortByCompletion:
        new RTodoList(draft).sortByCompletion();
        break;
      case TodoListEnums.TodoList_setTitle:
        new RTodoList(draft).setTitle(action.payload);
        break;
      case TodoListEnums.TodoList_addLotOfItems:
        new RTodoList(draft).addLotOfItems(action.payload);
        break;
      case TodoListEnums.TodoList_initState:
        new RTodoList(draft).initState(action.payload);
        break;
      case TodoListEnums.TodoList_setLoadState:
        new RTodoList(draft).setLoadState(action.payload);
        break;
      case TodoListEnums.TodoList_setData:
        new RTodoList(draft).setData(action.payload);
        break;
      case TodoListEnums.TodoList_setError:
        new RTodoList(draft).setError(action.payload);
        break;
    }
  });
};
/********************************
 * React Context API component   *
 ********************************/
export const TodoListContext = React.createContext<IProps>(
  initWithMethodsTodoList()
);
export const TodoListConsumer = TodoListContext.Consumer;
let instanceCnt = 1;
export class TodoListProvider extends React.Component {
  public state: ITodoList = initTodoList();
  public lastSetState: ITodoList;
  private __devTools: any = null;
  private __selectorlistToDisplay: any = null;
  constructor(props: any) {
    super(props);
    this.lastSetState = this.state;
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.toggleSortOrder = this.toggleSortOrder.bind(this);
    this.clearTodoList = this.clearTodoList.bind(this);
    this.reverse = this.reverse.bind(this);
    this.sortById = this.sortById.bind(this);
    this.sortByTitle = this.sortByTitle.bind(this);
    this.sortByCompletion = this.sortByCompletion.bind(this);
    this.setTitle = this.setTitle.bind(this);
    this.addLotOfItems = this.addLotOfItems.bind(this);
    this.getItems = this.getItems.bind(this);
    this.initState = this.initState.bind(this);
    this.setLoadState = this.setLoadState.bind(this);
    this.setData = this.setData.bind(this);
    this.setError = this.setError.bind(this);
    this.__selectorlistToDisplay = listToDisplaySelectorFnCreator();
    const devs = window["devToolsExtension"]
      ? window["devToolsExtension"]
      : null;
    if (devs) {
      this.__devTools = devs.connect({ name: "TodoList" + instanceCnt++ });
      this.__devTools.init(this.state);
      this.__devTools.subscribe((msg: any) => {
        if (msg.type === "DISPATCH" && msg.state) {
          this.setState(JSON.parse(msg.state));
        }
      });
    }
  }
  public componentWillUnmount() {
    if (this.__devTools) {
      this.__devTools.unsubscribe();
    }
  }
  public setStateSync(state: ITodoList) {
    this.lastSetState = state;
    this.setState(state);
  }
  nextPage() {
    const nextState = immer.produce(this.state, draft =>
      new RTodoList(draft).nextPage()
    );
    if (this.__devTools) {
      this.__devTools.send("nextPage", nextState);
    }
    this.setStateSync(nextState);
  }
  prevPage() {
    const nextState = immer.produce(this.state, draft =>
      new RTodoList(draft).prevPage()
    );
    if (this.__devTools) {
      this.__devTools.send("prevPage", nextState);
    }
    this.setStateSync(nextState);
  }
  toggleSortOrder() {
    const nextState = immer.produce(this.state, draft =>
      new RTodoList(draft).toggleSortOrder()
    );
    if (this.__devTools) {
      this.__devTools.send("toggleSortOrder", nextState);
    }
    this.setStateSync(nextState);
  }
  clearTodoList() {
    const nextState = immer.produce(this.state, draft =>
      new RTodoList(draft).clearTodoList()
    );
    if (this.__devTools) {
      this.__devTools.send("clearTodoList", nextState);
    }
    this.setStateSync(nextState);
  }
  reverse() {
    const nextState = immer.produce(this.state, draft =>
      new RTodoList(draft).reverse()
    );
    if (this.__devTools) {
      this.__devTools.send("reverse", nextState);
    }
    this.setStateSync(nextState);
  }
  sortById() {
    const nextState = immer.produce(this.state, draft =>
      new RTodoList(draft).sortById()
    );
    if (this.__devTools) {
      this.__devTools.send("sortById", nextState);
    }
    this.setStateSync(nextState);
  }
  sortByTitle() {
    const nextState = immer.produce(this.state, draft =>
      new RTodoList(draft).sortByTitle()
    );
    if (this.__devTools) {
      this.__devTools.send("sortByTitle", nextState);
    }
    this.setStateSync(nextState);
  }
  sortByCompletion() {
    const nextState = immer.produce(this.state, draft =>
      new RTodoList(draft).sortByCompletion()
    );
    if (this.__devTools) {
      this.__devTools.send("sortByCompletion", nextState);
    }
    this.setStateSync(nextState);
  }
  setTitle(value: string) {
    const nextState = immer.produce(this.state, draft =>
      new RTodoList(draft).setTitle(value)
    );
    if (this.__devTools) {
      this.__devTools.send("setTitle", nextState);
    }
    this.setStateSync(nextState);
  }
  addLotOfItems(cnt: number) {
    const nextState = immer.produce(this.state, draft =>
      new RTodoList(draft).addLotOfItems(cnt)
    );
    if (this.__devTools) {
      this.__devTools.send("addLotOfItems", nextState);
    }
    this.setStateSync(nextState);
  }
  /**
   * Fetch items from json placeholder service
   */
  async getItems() {
    new RTodoList(
      undefined,
      (action: any) => {
        const nextState = TodoListReducer(this.lastSetState, action);
        if (this.__devTools) {
          this.__devTools.send(action.type, nextState);
        }
        this.setStateSync(nextState);
      },
      () => ({ TodoList: this.lastSetState })
    ).getItems();
  }
  initState(name: string) {
    const nextState = immer.produce(this.state, draft =>
      new RTodoList(draft).initState(name)
    );
    if (this.__devTools) {
      this.__devTools.send("initState", nextState);
    }
    this.setStateSync(nextState);
  }
  setLoadState(opts: { name: string; state: TaskState }) {
    const nextState = immer.produce(this.state, draft =>
      new RTodoList(draft).setLoadState(opts)
    );
    if (this.__devTools) {
      this.__devTools.send("setLoadState", nextState);
    }
    this.setStateSync(nextState);
  }
  setData(opts: { name: string; data: any }) {
    const nextState = immer.produce(this.state, draft =>
      new RTodoList(draft).setData(opts)
    );
    if (this.__devTools) {
      this.__devTools.send("setData", nextState);
    }
    this.setStateSync(nextState);
  }
  setError(opts: { name: string; err: any }) {
    const nextState = immer.produce(this.state, draft =>
      new RTodoList(draft).setError(opts)
    );
    if (this.__devTools) {
      this.__devTools.send("setError", nextState);
    }
    this.setStateSync(nextState);
  }
  public render() {
    return (
      <TodoListContext.Provider
        value={{
          ...this.state,
          nextPage: this.nextPage,
          prevPage: this.prevPage,
          toggleSortOrder: this.toggleSortOrder,
          clearTodoList: this.clearTodoList,
          reverse: this.reverse,
          sortById: this.sortById,
          sortByTitle: this.sortByTitle,
          sortByCompletion: this.sortByCompletion,
          setTitle: this.setTitle,
          addLotOfItems: this.addLotOfItems,
          getItems: this.getItems,
          initState: this.initState,
          setLoadState: this.setLoadState,
          setData: this.setData,
          setError: this.setError,
          listToDisplay: this.__selectorlistToDisplay(this.state)
        }}
      >
        {" "}
        {this.props.children}
      </TodoListContext.Provider>
    );
  }
}
