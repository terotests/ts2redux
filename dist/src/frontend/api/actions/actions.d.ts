import { ShopCartItem } from '../../state';
import { UserInfoModelMsg } from '../../state';
export declare const action_SHOPCARTMODEL_UPDATEITEMS: (payload: ShopCartItem[]) => {
    type: string;
    payload: ShopCartItem[];
};
export declare const fetchAllDispatcher: () => (dispatch: any) => Promise<void>;
export declare const getItemsFromCategoryDispatcher: (id: number) => (dispatch: any) => Promise<void>;
export declare const action_SHOPCARTMODEL_ADDITEM: (payload: ShopCartItem) => {
    type: string;
    payload: ShopCartItem;
};
export declare const RequstAddNewItemDispatcher: (itemName: string) => (dispatch: any) => Promise<void>;
export declare const AnyFnDispatcher: (itemName: string) => (dispatch: any) => Promise<void>;
export declare const action_USERINFOMODEL_SETUSER: (payload: UserInfoModelMsg) => {
    type: string;
    payload: UserInfoModelMsg;
};
export declare const loginUserDispatcher: (username: string, password: string) => (dispatch: any) => Promise<void>;
