export interface TodoListItem {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}
declare type TaskState = 'UNDEFINED' | 'RUNNING' | 'LOADED' | {
    type: 'ERROR';
    error: any;
};
export interface ContainerPropsMethods {
    getItems?: () => any;
}
export interface ITodoList {
    items: TodoListItem[];
    state: TaskState;
}
export interface ContainerPropsState extends ITodoList {
}
export interface Props extends ITodoList, ContainerPropsMethods {
}
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
    getItems(): Promise<void>;
    static getItems(): (dispatcher: any, getState: any) => void;
}
export declare const TodoListEnums: {
    TodoList_items: string;
    TodoList_state: string;
};
export declare const TodoListReducer: (state: ITodoList, action: any) => ITodoList;
export {};
