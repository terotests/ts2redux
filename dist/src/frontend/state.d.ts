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
    fetchAll?: TaskState<ShopCartItem>;
    RequstAddNewItem?: TaskState<ShopCartItem>;
    AnyFn?: TaskState<ShopCartItem>;
}
export declare function InitShopCartModel(): ShopCartModel;
export declare function updateItems(input: ShopCartModel, newItems: ShopCartItem[]): ShopCartModel;
/**
 * @reducer updateItems
 */
export declare function fetchAll(): Promise<ShopCartItem[]>;
export declare function AddItem(input: ShopCartModel, newItem: ShopCartItem): ShopCartModel;
/**
 * @reducer AddItem
 */
export declare function RequstAddNewItem(itemName: string): Promise<ShopCartItem>;
/**
 * @reducer AddItem
 */
export declare function AnyFn(itemName: string): Promise<ShopCartItem>;
