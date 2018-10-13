/**
 * User Interface State
 */
export interface ShopCartItem {
    id?: number;
    name: string;
}
export interface ShopCart {
    newItemName?: string;
    items: ShopCartItem[];
}
export declare enum TaskState {
    UNDEFINED = 0,
    RUNNING = 1,
    ERROR = 2,
    SUCCESS = 3
}
export interface ContainerPropsMethods {
    setUserMessage?: (value: string) => any;
    add?: (item: ShopCartItem) => any;
    removeFirst?: () => any;
    sort?: () => any;
    addCart?: () => any;
    addCartSync?: () => any;
    addToCart?: (adding: {
        cartId: string;
        item: ShopCartItem;
    }) => any;
    setCartNewItem?: (adding: {
        cartId: string;
        name: string;
    }) => any;
    addToCartRandom?: () => any;
    renameLast?: (newName: string) => any;
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
    userMessage: string;
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
    userMessage: string;
    setUserMessage(value: string): void;
    static setUserMessage(value: string): (dispatcher: any, getState: any) => void;
    add(item: ShopCartItem): void;
    static add(item: ShopCartItem): (dispatcher: any, getState: any) => void;
    removeFirst(): void;
    static removeFirst(): (dispatcher: any, getState: any) => void;
    sort(): void;
    static sort(): (dispatcher: any, getState: any) => void;
    /**
     * Creates a new shopping cart
     */
    addCart(): Promise<void>;
    static addCart(): (dispatcher: any, getState: any) => void;
    addCartSync(): void;
    static addCartSync(): (dispatcher: any, getState: any) => void;
    addToCart(adding: {
        cartId: string;
        item: ShopCartItem;
    }): void;
    static addToCart(adding: {
        cartId: string;
        item: ShopCartItem;
    }): (dispatcher: any, getState: any) => void;
    setCartNewItem(adding: {
        cartId: string;
        name: string;
    }): void;
    static setCartNewItem(adding: {
        cartId: string;
        name: string;
    }): (dispatcher: any, getState: any) => void;
    addToCartRandom(): void;
    static addToCartRandom(): (dispatcher: any, getState: any) => void;
    renameLast(newName: string): void;
    static renameLast(newName: string): (dispatcher: any, getState: any) => void;
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
    TestModel_userMessage: string;
    TestModel_setUserMessage: string;
    TestModel_add: string;
    TestModel_removeFirst: string;
    TestModel_sort: string;
    TestModel_addCartSync: string;
    TestModel_addToCart: string;
    TestModel_setCartNewItem: string;
    TestModel_addToCartRandom: string;
    TestModel_renameLast: string;
};
export declare const TestModelReducer: (state: ITestModel, action: any) => ITestModel;
