export interface TodoListItem {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}
export declare type TaskState = 'UNDEFINED' | 'RUNNING' | 'LOADED' | 'ERROR';
import { State } from './index';
export interface ContainerPropsMethods {
    clearTodoList?: () => any;
    sortById?: () => any;
    sortByTitle?: () => any;
    sortByCompletion?: () => any;
    getItems?: () => any;
}
export interface ITodoList {
    items: TodoListItem[];
    state: TaskState;
    stateError: any;
}
export interface ContainerPropsState extends ITodoList {
}
export interface Props extends ContainerPropsState, ContainerPropsMethods {
}
export declare const mapStateToProps: (state: State) => ContainerPropsState;
export declare const mapDispatchToProps: (dispatch: any) => ContainerPropsMethods;
export declare const StateConnector: any;
/**
 * @generated true
 */
export declare class RTodoList {
    private _state?;
    private _dispatch?;
    private _getState?;
    constructor(state?: ITodoList, dispatch?: (action: any) => void, getState?: () => ITodoList);
    items: TodoListItem[];
    state: TaskState;
    stateError: any;
    clearTodoList(): void;
    static clearTodoList(): (dispatcher: any, getState: any) => void;
    sortById(): void;
    static sortById(): (dispatcher: any, getState: any) => void;
    sortByTitle(): void;
    static sortByTitle(): (dispatcher: any, getState: any) => void;
    sortByCompletion(): void;
    static sortByCompletion(): (dispatcher: any, getState: any) => void;
    getItems(): Promise<void>;
    static getItems(): (dispatcher: any, getState: any) => void;
}
export declare const TodoListEnums: {
    TodoList_items: string;
    TodoList_state: string;
    TodoList_stateError: string;
    TodoList_clearTodoList: string;
    TodoList_sortById: string;
    TodoList_sortByTitle: string;
    TodoList_sortByCompletion: string;
};
export declare const TodoListReducer: (state: ITodoList, action: any) => ITodoList;
