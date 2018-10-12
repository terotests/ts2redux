import { setTimeout } from "timers";

/**
 * User Interface State 
 */

export interface ShopCartItem {
  id?: number
  name: string
}

export enum TaskState {
  UNDEFINED,
  RUNNING,
  ERROR,
  SUCCESS,
}

const MSG = 'STATE IS NOW'
const MSG2 = 'AFTER DISPATH STATE IS'
const DELAY = 1000
/**
 * @simpleredux true
 */
class TestModel {
  // model with initializer
  items:ShopCartItem[] = []
  maxId:number = 1
  shopState:TaskState = TaskState.UNDEFINED
  // reducer
  add( item:ShopCartItem ) {
    console.log(this.maxId)
    this.items.push({
      ...item,
      id : this.maxId++      
    })
  }
  // action
  async createItem(someName:string) {
    console.log(MSG, this.shopState)
    if(this.shopState == TaskState.RUNNING) {
      return
    }
    this.shopState = TaskState.RUNNING
    await new Promise( res=> {
      setTimeout(res, DELAY)
    })
    console.log(MSG2, this.shopState)
    this.add({name:someName})
    this.shopState = TaskState.SUCCESS
  }
}
