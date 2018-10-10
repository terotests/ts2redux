/**
 * User Interface State
 *
 * Nice links btw.
 * https://github.com/gcanti/fp-ts/issues/251
 * https://jaysoo.ca/2017/05/10/learn-fp-with-react-part-2/
 */
export interface ShopCartItem {
    name: string;
}
export declare type TaskStateName = 'UNDEFINED' | 'RUNNING' | 'ERROR' | 'SUCCESS';
export interface TaskState<T> {
    state?: TaskStateName;
    result?: T;
    error?: any;
}
/**
* @redux model
*/
export interface ShopCartModel {
    items: ShopCartItem[];
    fetchAll?: TaskState<ShopCartItem[]>;
    RequstAddNewItem?: TaskState<ShopCartItem>;
    AnyFn?: TaskState<ShopCartItem>;
}
export declare function initializeShopCart(): ShopCartModel;
export declare function updateItems(input: ShopCartModel, newItems: ShopCartItem[]): ShopCartModel;
/**
 * @taskfor updateItems
 */
export declare function fetchAll(dispatch: () => void): Promise<ShopCartItem[]>;
/**
 * @taskfor updateItems
 */
export declare function getItemsFromCategory(id: number, dispatch: () => void): Promise<ShopCartItem[]>;
export declare function AddItem(input: ShopCartModel, newItem: ShopCartItem): ShopCartModel;
/**
 * @taskfor AddItem
 */
export declare function RequstAddNewItem(itemName: string): Promise<ShopCartItem>;
/**
 * @taskfor AddItem
 */
export declare function AnyFn(itemName: string): Promise<ShopCartItem>;
/**
* @redux model
*/
export interface UserInfoModel {
    logged: boolean;
    userId?: number;
    userName?: string;
}
export interface UserInfoModelMsg extends UserInfoModel {
}
export declare function initUserModel(): UserInfoModel;
export declare function setUser(input: UserInfoModel, basicInfo: UserInfoModelMsg): UserInfoModel;
/**
 * @taskfor setUser
 */
export declare function loginUser(username: string, password: string): Promise<UserInfoModelMsg>;
/**
 *
 * @param username
 * @param password
 * @reduxfn true
 */
export declare function loginUser2(username: string, password: string): Promise<(state: UserInfoModelMsg) => UserInfoModelMsg>;
