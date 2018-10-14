export interface TodoListItem {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}
export interface ContainerPropsMethods {
    getItems?: () => any;
}
export interface ITodoList {
    items: TodoListItem[];
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
    getItems(): Promise<void>;
    static getItems(): (dispatcher: any, getState: any) => void;
}
export declare const TodoListEnums: {
    TodoList_items: string;
};
export declare const TodoListReducer: (state: ITodoList, action: any) => ITodoList;
