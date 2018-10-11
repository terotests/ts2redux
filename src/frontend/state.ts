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
  fetchAll?: TaskState<ShopCartItem[]>   
  RequstAddNewItem?: TaskState<ShopCartItem>   
  AnyFn?: TaskState<ShopCartItem>
}

export function initializeShopCart() : ShopCartModel {
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
 * @taskfor updateItems
 */
export async function fetchAll( dispatch:()=>void ) : Promise<ShopCartItem[]> {
  return [{name:'foo'}, {name:'bar'}]
}

/**
 * @taskfor updateItems
 */
export async function getItemsFromCategory( id:number, dispatch:()=>void ) : Promise<ShopCartItem[]> {
  return [{name:'foo'}, {name:'bar'}]
}

export function AddItem(input:ShopCartModel, newItem:ShopCartItem) : ShopCartModel {
  return {
    ...input,
    items : [...input.items, newItem]
  }
}

/**
 * @taskfor AddItem
 */
export async function RequstAddNewItem(itemName:string) : Promise<ShopCartItem> {
  return {
    name: itemName
  }
}

/**
 * @taskfor AddItem
 */
export async function AnyFn(itemName:string) : Promise<ShopCartItem> {
  return {
    name: itemName
  }
}


/**
* @redux model 
*/
export interface UserInfoModel {
  logged: boolean
  userId?: number
  userName?: string
}

export interface UserInfoModelMsg extends UserInfoModel {}

export function initUserModel() : UserInfoModel {
  return {
    logged: false
  }
}

export function setUser(input:UserInfoModel, basicInfo:UserInfoModelMsg ) : UserInfoModel {
  return {
    ...input,
    ...basicInfo
  }
}

/**
 * @taskfor setUser
 */
export async function loginUser(username:string, password:string) : Promise<UserInfoModelMsg> {
  return {
     logged: false
  }
}


/*

Yksi mahdollinen tapa voisi olla tehdä async -funktio, jota kutsutaan ensin ja joka sitten
lopulta dispatchää uuden UserInfoModel tuloksen...

export async function loginUser(username:string, password:string) : Promise<UserInfoModelMsg> {
  return {
     logged: false
  }
}
*/

/**
 * 
 * @param username 
 * @param password 
 * @reduxfn true
 */
export async function loginUser2(username:string, password:string) : Promise< (state:UserInfoModelMsg) => UserInfoModelMsg> {
  // Do something and then return the data... 
  return (state:UserInfoModelMsg) => {
    return {
     logged: false
    }
  }
}

/*
// Miten haluaisin kirjoittaa oikeasti...
class TestModel {

  private _items:ShopCartItem[] 

  // These could be one variable ...
  private _addingItem = false
  private itemAddSuccess = false

  get addingItem():boolean {
    return this._addingItem;
  }

  set addingItem(v:boolean) {
    this._addingItem = v
  }  

  async addItem(newItem:ShopCartItem) {
    // This would be dispatching some stuff...
    this.addingItem = true
    // this creates a reducer
    this.items.push( newItem )
    this.itemAddSuccess = true
  }

  get items():ShopCartItem[]  {
    return this.items;
  }
  set items(value:ShopCartItem[]) {
    this.items = value;
  }
}
*/
// this.items.push( ) --> 
// Would result as reducer for this.items.push( newItem )


