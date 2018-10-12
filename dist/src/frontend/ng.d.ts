/**
 * User Interface State
 */
export interface ShopCartItem {
    id?: number;
    name: string;
}
export declare enum TaskState {
    UNDEFINED = 0,
    RUNNING = 1,
    ERROR = 2,
    SUCCESS = 3
}
export interface ITestModel {
    items: ShopCartItem[];
    maxId: number;
    shopState: TaskState;
}
export declare class RTestModel {
    private _state?;
    private _dispatch?;
    private _getState?;
    constructor(state?: ITestModel, dispatch?: (action: any) => void, getState?: () => ITestModel);
    items: ShopCartItem[];
    maxId: number;
    shopState: TaskState;
    add(item: ShopCartItem): void;
    createItem(someName: string): Promise<void>;
    static createItem(someName: string): (dispatcher: any, getState: any) => void;
}
export declare const TestModelEnums: {
    TestModel_items: string;
    TestModel_maxId: string;
    TestModel_shopState: string;
    TestModel_add: string;
};
export declare const TestModelReducer: (state: ITestModel, action: any) => ITestModel;
