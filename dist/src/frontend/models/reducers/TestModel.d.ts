/*********************************************************************************
 *                                                                                *
 *   Redux Reducers and React Context API Provider/Consumer for state TestModel   *
 *   Generated by ts2redux from Source file ../TestModel.ts                       *
 *                                                                                *
 *********************************************************************************/
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
export interface TestObj {
    name: string;
}
import { IState } from "./index";
import * as React from "react";
export interface IContainerPropsMethods {
    setUserMessage: (value: string) => any;
    add: (item: ShopCartItem) => any;
    removeFirst: () => any;
    sort: () => any;
    addCart: () => any;
    addCartSync: () => any;
    addToCart: (adding: {
        cartId: string;
        item: ShopCartItem;
    }) => any;
    setCartNewItem: (adding: {
        cartId: string;
        name: string;
    }) => any;
    addToCartRandom: () => any;
    renameLast: (newName: string) => any;
    createItem: (someName: string) => any;
    addOneFriend: (name: any) => any;
    fillSomeFriends: () => any;
    ChangeLastItem: () => any;
}
export interface ITestModel {
    items: ShopCartItem[];
    maxId: number;
    maybeString?: string;
    str_init_test: string;
    bool_init_test: boolean;
    bool4: boolean;
    obj_init_test: TestObj;
    rand_init_test: number;
    arr_init_test: Array<number>;
    arr_init_test2: Array<any>;
    obj_literal_test: any;
    cartId: number;
    shopState: TaskState;
    carts: {
        [key: string]: ShopCart;
    };
    userMessage: string;
    testObj?: TestObj;
}
export declare type IContainerPropsState = ITestModel;
export interface IProps extends IContainerPropsState, IContainerPropsMethods {
}
export declare function mapStateToPropsWithKeys<K extends keyof IContainerPropsState>(state: IState, keys: K[]): Pick<IContainerPropsState, K>;
export declare const mapStateToProps: (state: IState) => ITestModel;
export declare const mapDispatchToProps: (dispatch: any) => IContainerPropsMethods;
export declare function ConnectKeys<K extends keyof ITestModel, J extends keyof IContainerPropsMethods>(keys: K[], methods: J[]): any;
export declare const StateConnector: any;
/**
 * @generated true
 */
export declare class RTestModel {
    private _state?;
    private _dispatch?;
    private _getState?;
    constructor(state?: ITestModel, dispatch?: (action: any) => void, getState?: () => any);
    items: ShopCartItem[];
    maxId: number;
    maybeString: string | undefined;
    str_init_test: string;
    bool_init_test: boolean;
    bool4: boolean;
    obj_init_test: TestObj;
    rand_init_test: number;
    arr_init_test: Array<number>;
    arr_init_test2: Array<any>;
    obj_literal_test: any;
    cartId: number;
    shopState: TaskState;
    carts: {
        [key: string]: ShopCart;
    };
    userMessage: string;
    testObj: TestObj | undefined;
    setUserMessage(value: string): void;
    static setUserMessage(value: string): (dispatcher: any, getState: any) => void;
    add(item: ShopCartItem): void;
    static add(item: ShopCartItem): (dispatcher: any, getState: any) => void;
    removeFirst(): void;
    static removeFirst(): (dispatcher: any, getState: any) => void;
    sort(): void;
    static sort(): (dispatcher: any, getState: any) => void;
    addCart(): void;
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
    TestModel_maybeString: string;
    TestModel_str_init_test: string;
    TestModel_bool_init_test: string;
    TestModel_bool4: string;
    TestModel_obj_init_test: string;
    TestModel_rand_init_test: string;
    TestModel_arr_init_test: string;
    TestModel_arr_init_test2: string;
    TestModel_obj_literal_test: string;
    TestModel_cartId: string;
    TestModel_shopState: string;
    TestModel_carts: string;
    TestModel_userMessage: string;
    TestModel_testObj: string;
    TestModel_setUserMessage: string;
    TestModel_add: string;
    TestModel_removeFirst: string;
    TestModel_sort: string;
    TestModel_addCart: string;
    TestModel_addCartSync: string;
    TestModel_addToCart: string;
    TestModel_setCartNewItem: string;
    TestModel_addToCartRandom: string;
    TestModel_renameLast: string;
};
export declare const TestModelReducer: (state: ITestModel, action: any) => ITestModel;
/********************************
 * React Context API component   *
 ********************************/
export declare const TestModelContext: React.Context<IProps>;
export declare const TestModelConsumer: React.ComponentType<React.ConsumerProps<IProps>>;
export declare class TestModelProvider extends React.Component {
    state: ITestModel;
    lastSetState: ITestModel;
    private __devTools;
    constructor(props: any);
    componentWillUnmount(): void;
    setStateSync(state: ITestModel): void;
    setUserMessage(value: string): void;
    add(item: ShopCartItem): void;
    removeFirst(): void;
    sort(): void;
    addCart(): void;
    addCartSync(): void;
    addToCart(adding: {
        cartId: string;
        item: ShopCartItem;
    }): void;
    setCartNewItem(adding: {
        cartId: string;
        name: string;
    }): void;
    addToCartRandom(): void;
    renameLast(newName: string): void;
    createItem(someName: string): Promise<void>;
    addOneFriend(name: any): Promise<void>;
    fillSomeFriends(): Promise<void>;
    ChangeLastItem(): Promise<void>;
    render(): JSX.Element;
}
