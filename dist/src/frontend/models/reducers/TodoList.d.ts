/********************************************************************************
 *                                                                               *
 *   Redux Reducers and React Context API Provider/Consumer for state TodoList   *
 *   Generated by ts2redux from Source file ../TodoList.ts                       *
 *                                                                               *
 ********************************************************************************/
import { IState } from "./index";
import * as React from "react";
import { TodoListItem } from "../interfaces";
export declare type TaskState = "UNDEFINED" | "RUNNING" | "LOADED" | "ERROR";
export declare enum SortOrder {
    ASC = "asc",
    DESC = "desc"
}
/**
 * @redux true
 */
export declare class TodoList {
    items: TodoListItem[];
    state: TaskState;
    stateError: any;
    sortOrder: SortOrder;
    listStart: number;
    listPageLength: number;
    listTitle: string;
    readonly listToDisplay: TodoListItem[];
    private findMaxId;
    nextPage(): void;
    prevPage(): void;
    toggleSortOrder(): void;
    clearTodoList(): void;
    reverse(): void;
    sortById(): void;
    sortByTitle(): void;
    sortByCompletion(): void;
    setTitle(value: string): void;
    addLotOfItems(cnt: number): void;
    /**
     * Fetch items from json placeholder service
     */
    getItems(): Promise<void>;
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
}
export interface ITodoList {
    items: TodoListItem[];
    state: TaskState;
    stateError: any;
    sortOrder: SortOrder;
    listStart: number;
    listPageLength: number;
    listTitle: string;
}
export declare const itemsSelectorFn: (state: ITodoList) => TodoListItem[];
export declare const stateSelectorFn: (state: ITodoList) => TaskState;
export declare const stateErrorSelectorFn: (state: ITodoList) => any;
export declare const sortOrderSelectorFn: (state: ITodoList) => SortOrder;
export declare const listStartSelectorFn: (state: ITodoList) => number;
export declare const listPageLengthSelectorFn: (state: ITodoList) => number;
export declare const listTitleSelectorFn: (state: ITodoList) => string;
export declare const listToDisplaySelectorFnCreator: () => import("reselect").OutputSelector<ITodoList, TodoListItem[], (res1: TodoListItem[], res2: SortOrder, res3: number, res4: number) => TodoListItem[]>;
export declare const listToDisplaySelector: import("reselect").OutputSelector<ITodoList, TodoListItem[], (res1: TodoListItem[], res2: SortOrder, res3: number, res4: number) => TodoListItem[]>;
export interface IContainerPropsState extends ITodoList {
    listToDisplay: TodoListItem[];
}
export interface IProps extends IContainerPropsState, IContainerPropsMethods {
}
export declare function mapStateToPropsWithKeys<K extends keyof IContainerPropsState>(state: IState, keys: K[]): Pick<IContainerPropsState, K>;
export declare const mapStateToProps: (state: IState) => IContainerPropsState;
export declare const mapDispatchToProps: (dispatch: any) => IContainerPropsMethods;
export declare function ConnectKeys<K extends keyof ITodoList, J extends keyof IContainerPropsMethods>(keys: K[], methods: J[]): any;
export declare const StateConnector: any;
/**
 * @generated true
 */
export declare class RTodoList {
    private _state?;
    private _dispatch?;
    private _getState?;
    constructor(state?: ITodoList, dispatch?: (action: any) => void, getState?: () => any);
    items: TodoListItem[];
    state: TaskState;
    stateError: any;
    sortOrder: SortOrder;
    listStart: number;
    listPageLength: number;
    listTitle: string;
    private findMaxId;
    nextPage(): void;
    static nextPage(): (dispatcher: any, getState: any) => void;
    prevPage(): void;
    static prevPage(): (dispatcher: any, getState: any) => void;
    toggleSortOrder(): void;
    static toggleSortOrder(): (dispatcher: any, getState: any) => void;
    clearTodoList(): void;
    static clearTodoList(): (dispatcher: any, getState: any) => void;
    reverse(): void;
    static reverse(): (dispatcher: any, getState: any) => void;
    sortById(): void;
    static sortById(): (dispatcher: any, getState: any) => void;
    sortByTitle(): void;
    static sortByTitle(): (dispatcher: any, getState: any) => void;
    sortByCompletion(): void;
    static sortByCompletion(): (dispatcher: any, getState: any) => void;
    setTitle(value: string): void;
    static setTitle(value: string): (dispatcher: any, getState: any) => void;
    addLotOfItems(cnt: number): void;
    static addLotOfItems(cnt: number): (dispatcher: any, getState: any) => void;
    /**
     * Fetch items from json placeholder service
     */
    getItems(): Promise<void>;
    static getItems(): (dispatcher: any, getState: any) => void;
}
export declare const TodoListEnums: {
    TodoList_items: string;
    TodoList_state: string;
    TodoList_stateError: string;
    TodoList_sortOrder: string;
    TodoList_listStart: string;
    TodoList_listPageLength: string;
    TodoList_listTitle: string;
    TodoList_findMaxId: string;
    TodoList_nextPage: string;
    TodoList_prevPage: string;
    TodoList_toggleSortOrder: string;
    TodoList_clearTodoList: string;
    TodoList_reverse: string;
    TodoList_sortById: string;
    TodoList_sortByTitle: string;
    TodoList_sortByCompletion: string;
    TodoList_setTitle: string;
    TodoList_addLotOfItems: string;
};
export declare const TodoListReducer: (state: ITodoList, action: any) => ITodoList;
/********************************
 * React Context API component   *
 ********************************/
export declare const TodoListContext: React.Context<IProps>;
export declare const TodoListConsumer: React.ComponentType<React.ConsumerProps<IProps>>;
export declare class TodoListProvider extends React.Component {
    state: ITodoList;
    lastSetState: ITodoList;
    private __devTools;
    private __selectorlistToDisplay;
    constructor(props: any);
    componentWillUnmount(): void;
    setStateSync(state: ITodoList): void;
    nextPage(): void;
    prevPage(): void;
    toggleSortOrder(): void;
    clearTodoList(): void;
    reverse(): void;
    sortById(): void;
    sortByTitle(): void;
    sortByCompletion(): void;
    setTitle(value: string): void;
    addLotOfItems(cnt: number): void;
    /**
     * Fetch items from json placeholder service
     */
    getItems(): Promise<void>;
    render(): JSX.Element;
}
