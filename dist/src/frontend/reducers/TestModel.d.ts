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
export interface ContainerPropsMethods {
    addCart?: () => any;
    addToCart?: (adding: {
        cartId: string;
        item: ShopCartItem;
    }) => any;
    addToCartRandom?: () => any;
    createItem?: (someName: string) => any;
    addOneFriend?: (name: any) => any;
    fillSomeFriends?: () => any;
    ChangeLastItem?: () => any;
}
export interface ITestModel {
    items: ShopCartItem[];
    maxId: number;
    cartId: number;
    shopState: TaskState;
    carts: {
        [key: string]: ShopCart;
    };
}
export interface ContainerPropsState extends ITestModel {
}
export interface Props extends ITestModel, ContainerPropsMethods {
}
export declare const StateConnector: any;
/**
 * @generated true
 */
export declare class RTestModel {
    private _state?;
    private _dispatch?;
    private _getState?;
    constructor(state?: ITestModel, dispatch?: (action: any) => void, getState?: () => ITestModel);
    items: ShopCartItem[];
    maxId: number;
    cartId: number;
    shopState: TaskState;
    carts: {
        [key: string]: ShopCart;
    };
    add(item: ShopCartItem): void;
    addCart(): Promise<void>;
    static addCart(): (dispatcher: any, getState: any) => void;
    addToCart(adding: {
        cartId: string;
        item: ShopCartItem;
    }): Promise<void>;
    static addToCart(adding: {
        cartId: string;
        item: ShopCartItem;
    }): (dispatcher: any, getState: any) => void;
    addToCartRandom(): Promise<void>;
    static addToCartRandom(): (dispatcher: any, getState: any) => void;
    renameLast(newName: string): void;
    createItem(someName: string): Promise<void>;
    static createItem(someName: string): (dispatcher: any, getState: any) => void;
    addOneFriend(name: any): Promise<void>;
    static addOneFriend(name: any): (dispatcher: any, getState: any) => void;
    fillSomeFriends(): Promise<void>;
    static fillSomeFriends(): (dispatcher: any, getState: any) => void;
    ChangeLastItem(): Promise<void>;
    static ChangeLastItem(): (dispatcher: any, getState: any) => void;
}
export declare const TestModelEnums: {
    TestModel_items: string;
    TestModel_maxId: string;
    TestModel_cartId: string;
    TestModel_shopState: string;
    TestModel_carts: string;
    TestModel_add: string;
    TestModel_renameLast: string;
};
export declare const TestModelReducer: (state: ITestModel, action: any) => ITestModel;
