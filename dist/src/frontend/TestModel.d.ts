/**
 * User Interface State
 */
export interface ShopCartItem {
    id?: number;
    name: string;
}
export interface ShopCart {
    items: ShopCartItem[];
}
export declare enum TaskState {
    UNDEFINED = 0,
    RUNNING = 1,
    ERROR = 2,
    SUCCESS = 3
}
