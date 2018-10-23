export interface TodoListItem {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}
export declare type TaskState = 'UNDEFINED' | 'RUNNING' | 'LOADED' | 'ERROR';
export declare type SortColumns = 'id' | 'title';
export declare type FilterTypes = 'none' | 'completed';
/**
 * @redux true
 */
export declare class TodoList {
    items: TodoListItem[];
    state: TaskState;
    stateError: any;
    sortColumn: SortColumns;
    filterType: FilterTypes;
    getFilteredList(): TodoListItem[];
    getSortedList(): TodoListItem[];
    clearTodoList(): void;
    reverse(): void;
    sortById(): void;
    sortByTitle(): void;
    sortByCompletion(): void;
    /**
     * Fetch items from json placeholder service
     */
    getItems(): Promise<void>;
}
