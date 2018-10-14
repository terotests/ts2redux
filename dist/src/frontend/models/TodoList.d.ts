export interface TodoListItem {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}
export declare type TaskState = 'UNDEFINED' | 'RUNNING' | 'LOADED' | 'ERROR';
