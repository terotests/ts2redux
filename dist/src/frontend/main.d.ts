import { AnyAction, Store } from "redux";
import { IState } from "./models/reducers/";
import { TodoListItem } from "./models/interfaces";
export declare class TodoStoreController {
    private _store;
    constructor(store: Store<IState, AnyAction>);
    items: TodoListItem[];
    getItems(): Promise<TodoListItem[]>;
}
