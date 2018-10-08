/**
 * User Interface State 
 * 
 * Nice links btw.
 * https://github.com/gcanti/fp-ts/issues/251
 * https://jaysoo.ca/2017/05/10/learn-fp-with-react-part-2/
 */

export interface ShopCartItem {
  name: string
}

export type TaskStateName = 'UNDEFINED' | 'RUNNING' | 'ERROR' | 'SUCCESS'
export interface TaskState<T> {
  state?: TaskStateName
  result?: T
  error?: any
}

/**
* @redux model 
*/
export interface ShopCartModel {
  items:ShopCartItem[]

  // Some tasks that can have RUNNING -> ERROR -> SUCCESS
  fetchAll?: TaskState<ShopCartItem>   
  RequstAddNewItem?: TaskState<ShopCartItem>   
  AnyFn?: TaskState<ShopCartItem> 
}

// would be easier to say it like this
class CartModel {
  items:ShopCartItem[] = []
}

export function InitShopCartModel() : ShopCartModel {
  return {
    items : []
  }
}

export function updateItems(input:ShopCartModel, newItems:ShopCartItem[]) : ShopCartModel {
  return {
    ...input,
    items : [...newItems]
  }
}

/**
 * @reducer updateItems
 */
export async function fetchAll() : Promise<ShopCartItem[]> {
  return [{name:'foo'}, {name:'bar'}]
}



export function AddItem(input:ShopCartModel, newItem:ShopCartItem) : ShopCartModel {
  return {
    ...input,
    items : [...input.items, newItem]
  }
}

/**
 * @reducer AddItem
 */
export async function RequstAddNewItem(itemName:string) : Promise<ShopCartItem> {
  return {
    name: itemName
  }
}

/**
 * @reducer AddItem
 */
export async function AnyFn(itemName:string) : Promise<ShopCartItem> {
  return {
    name: itemName
  }
}


