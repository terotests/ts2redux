/********************************************************************************
 *                                                                               *
 *   Redux Reducers and React Context API Provider/Consumer for state TodoList   *
 *   Generated by ts2redux from Source file ../TodoList.ts                       *
 *                                                                               *
 ********************************************************************************/

import * as immer from "immer";
import { createSelector } from "reselect";
import { connect } from "react-redux";
import { IState } from "./index";
import * as React from "react";
import axios from "axios";
import { TodoListItem } from "../interfaces";

export type TaskState = "UNDEFINED" | "RUNNING" | "LOADED" | "ERROR";
export enum SortOrder {
  ASC = "asc",
  DESC = "desc"
}

const sortFn = (order: SortOrder) => (a: TodoListItem, b: TodoListItem) => {
  if (order === SortOrder.ASC) return a.id - b.id;
  return b.id - a.id;
};

/**
 * @redux true
 */
export class TodoList {
  items: TodoListItem[] = [];
  state: TaskState = "UNDEFINED";
  stateError: any;
  sortOrder: SortOrder = SortOrder.ASC;
  listStart = 0;
  listPageLength = 10;
  listTitle = "Title of TODO -list";
  customMessage = "";

  // Example of memoized list using reselect
  get listToDisplay(): TodoListItem[] {
    return this.items
      .filter(item => item.completed)
      .sort(sortFn(this.sortOrder))
      .slice(this.listStart, this.listStart + this.listPageLength);
  }

  private findMaxId(): number {
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
    if (this.state === "RUNNING") return;
    try {
      this.state = "RUNNING";
      this.items = (await axios.get(
        "https://jsonplaceholder.typicode.com/todos"
      )).data;
      this.state = "LOADED";
    } catch (e) {
      this.state = "ERROR";
      this.stateError = e;
    }
  }

  async getShortList(makeError: boolean) {
    if (makeError) {
      this.customMessage = "Custom Exception send this custom message to state";
      throw "Custom Exception";
    }
    this.customMessage = "";
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([1, 2, 3, 4, 5]);
      }, 1000);
    });
  }
}

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
  getShortList: (makeError: boolean) => any;
}
export interface ITodoList {
  items: TodoListItem[];
  state: TaskState;
  stateError: any;
  sortOrder: SortOrder;
  listStart: number;
  listPageLength: number;
  listTitle: string;
  customMessage: string;
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
export const customMessageSelectorFn = (state: ITodoList): string =>
  state.customMessage;
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

function pick<T, K extends keyof T>(o: T, ...props: K[]) {
  return props.reduce((a, e) => ({ ...a, [e]: o[e] }), {}) as Pick<T, K>;
}
export function mapStateToPropsWithKeys<K extends keyof IContainerPropsState>(
  state: IState,
  keys: K[]
): Pick<IContainerPropsState, K> {
  return pick(state.TodoList as IContainerPropsState, ...keys);
}

export const mapStateToProps = (state: IState): IContainerPropsState => {
  return {
    items: state.TodoList.items,
    state: state.TodoList.state,
    stateError: state.TodoList.stateError,
    sortOrder: state.TodoList.sortOrder,
    listStart: state.TodoList.listStart,
    listPageLength: state.TodoList.listPageLength,
    listTitle: state.TodoList.listTitle,
    customMessage: state.TodoList.customMessage,
    listToDisplay: listToDisplaySelector(state.TodoList)
  };
};

function mapDispatchToPropsWithKeys<K extends keyof IContainerPropsMethods>(
  dispatch: any,
  keys: K[]
): Pick<IContainerPropsMethods, K> {
  return pick(mapDispatchToProps(dispatch), ...keys);
}

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
    getShortList: (makeError: boolean) => {
      return dispatch(RTodoList.getShortList(makeError));
    }
  };
};

export function ConnectKeys<
  K extends keyof ITodoList,
  J extends keyof IContainerPropsMethods
>(keys: K[], methods: J[]) {
  return connect(
    (state: IState) => mapStateToPropsWithKeys(state, keys),
    (dispatch: any) => mapDispatchToPropsWithKeys(dispatch, methods)
  );
}

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
    customMessage: o.customMessage
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
    customMessage: o.customMessage,
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
    getShortList: o.getShortList,
    listToDisplay: o.listToDisplay
  };
};

/**
 * @generated true
 */
export class RTodoList {
  private _state?: ITodoList;
  private _dispatch?: <A extends {}, T extends {}>(action: A) => T;
  private _getState?: () => any;
  constructor(
    state?: ITodoList,
    dispatch?: (action: any) => any,
    getState?: () => any
  ) {
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
  get customMessage(): string {
    if (this._getState) {
      return this._getState().TodoList.customMessage;
    } else {
      if (this._state) {
        return this._state.customMessage;
      }
    }
    throw "Invalid State in TodoList_customMessage";
  }
  set customMessage(value: string) {
    if (this._state && typeof value !== "undefined") {
      this._state.customMessage = value;
    } else {
      // dispatch change for item customMessage
      if (this._dispatch) {
        this._dispatch({
          type: TodoListEnums.TodoList_customMessage,
          payload: value
        });
      }
    }
  }

  private findMaxId(): number {
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
      return new RTodoList(undefined, dispatcher, getState).nextPage();
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
      return new RTodoList(undefined, dispatcher, getState).prevPage();
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
      return new RTodoList(undefined, dispatcher, getState).toggleSortOrder();
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
      return new RTodoList(undefined, dispatcher, getState).clearTodoList();
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
      return new RTodoList(undefined, dispatcher, getState).reverse();
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
      return new RTodoList(undefined, dispatcher, getState).sortById();
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
      return new RTodoList(undefined, dispatcher, getState).sortByTitle();
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
      return new RTodoList(undefined, dispatcher, getState).sortByCompletion();
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
      return new RTodoList(undefined, dispatcher, getState).setTitle(value);
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
      return new RTodoList(undefined, dispatcher, getState).addLotOfItems(cnt);
    };
  }
  /**
   * Fetch items from json placeholder service
   */
  async getItems() {
    if (this.state === "RUNNING") return;
    try {
      this.state = "RUNNING";
      this.items = (await axios.get(
        "https://jsonplaceholder.typicode.com/todos"
      )).data;
      this.state = "LOADED";
    } catch (e) {
      this.state = "ERROR";
      this.stateError = e;
    }
  }

  public static getItems() {
    return (dispatcher: any, getState: any) => {
      return new RTodoList(undefined, dispatcher, getState).getItems();
    };
  }
  async getShortList(makeError: boolean) {
    if (makeError) {
      this.customMessage = "Custom Exception send this custom message to state";
      throw "Custom Exception";
    }
    this.customMessage = "";
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([1, 2, 3, 4, 5]);
      }, 1000);
    });
  }

  public static getShortList(makeError: boolean) {
    return (dispatcher: any, getState: any) => {
      return new RTodoList(undefined, dispatcher, getState).getShortList(
        makeError
      );
    };
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
  TodoList_customMessage: "TodoList_customMessage",
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
  TodoList_addLotOfItems: "TodoList_addLotOfItems"
};

export const TodoListReducer = (
  state: ITodoList = initTodoList(),
  action: any
) => {
  return immer.produce(state, (draft: ITodoList) => {
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
      case TodoListEnums.TodoList_customMessage:
        new RTodoList(draft).customMessage = action.payload;
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
    this.getShortList = this.getShortList.bind(this);
    this.__selectorlistToDisplay = listToDisplaySelectorFnCreator();
    const devs = window["__REDUX_DEVTOOLS_EXTENSION__"]
      ? window["__REDUX_DEVTOOLS_EXTENSION__"]
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
    const nextState = immer.produce(this.state, (draft: ITodoList) =>
      new RTodoList(draft).nextPage()
    );
    if (this.__devTools) {
      this.__devTools.send("nextPage", nextState);
    }
    this.setStateSync(nextState);
  }
  prevPage() {
    const nextState = immer.produce(this.state, (draft: ITodoList) =>
      new RTodoList(draft).prevPage()
    );
    if (this.__devTools) {
      this.__devTools.send("prevPage", nextState);
    }
    this.setStateSync(nextState);
  }
  toggleSortOrder() {
    const nextState = immer.produce(this.state, (draft: ITodoList) =>
      new RTodoList(draft).toggleSortOrder()
    );
    if (this.__devTools) {
      this.__devTools.send("toggleSortOrder", nextState);
    }
    this.setStateSync(nextState);
  }
  clearTodoList() {
    const nextState = immer.produce(this.state, (draft: ITodoList) =>
      new RTodoList(draft).clearTodoList()
    );
    if (this.__devTools) {
      this.__devTools.send("clearTodoList", nextState);
    }
    this.setStateSync(nextState);
  }
  reverse() {
    const nextState = immer.produce(this.state, (draft: ITodoList) =>
      new RTodoList(draft).reverse()
    );
    if (this.__devTools) {
      this.__devTools.send("reverse", nextState);
    }
    this.setStateSync(nextState);
  }
  sortById() {
    const nextState = immer.produce(this.state, (draft: ITodoList) =>
      new RTodoList(draft).sortById()
    );
    if (this.__devTools) {
      this.__devTools.send("sortById", nextState);
    }
    this.setStateSync(nextState);
  }
  sortByTitle() {
    const nextState = immer.produce(this.state, (draft: ITodoList) =>
      new RTodoList(draft).sortByTitle()
    );
    if (this.__devTools) {
      this.__devTools.send("sortByTitle", nextState);
    }
    this.setStateSync(nextState);
  }
  sortByCompletion() {
    const nextState = immer.produce(this.state, (draft: ITodoList) =>
      new RTodoList(draft).sortByCompletion()
    );
    if (this.__devTools) {
      this.__devTools.send("sortByCompletion", nextState);
    }
    this.setStateSync(nextState);
  }
  setTitle(value: string) {
    const nextState = immer.produce(this.state, (draft: ITodoList) =>
      new RTodoList(draft).setTitle(value)
    );
    if (this.__devTools) {
      this.__devTools.send("setTitle", nextState);
    }
    this.setStateSync(nextState);
  }
  addLotOfItems(cnt: number) {
    const nextState = immer.produce(this.state, (draft: ITodoList) =>
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
    return new RTodoList(
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
  async getShortList(makeError: boolean) {
    return new RTodoList(
      undefined,
      (action: any) => {
        const nextState = TodoListReducer(this.lastSetState, action);
        if (this.__devTools) {
          this.__devTools.send(action.type, nextState);
        }
        this.setStateSync(nextState);
      },
      () => ({ TodoList: this.lastSetState })
    ).getShortList(makeError);
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
          getShortList: this.getShortList,
          listToDisplay: this.__selectorlistToDisplay(this.state)
        }}
      >
        {" "}
        {this.props.children}
      </TodoListContext.Provider>
    );
  }
}
