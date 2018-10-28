export interface TodoListItem {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}
export declare type TaskState = 'UNDEFINED' | 'RUNNING' | 'LOADED' | 'ERROR';
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
    readonly listToDisplay: TodoListItem[];
    nextPage(): void;
    prevPage(): void;
    toggleSortOrder(): void;
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
