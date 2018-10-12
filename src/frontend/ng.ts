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

import * as immer from 'immer'
export interface ITestModel {
  items: ShopCartItem[]
  maxId: number
  shopState: TaskState
}

const init_TestModel = () => {
  const o = new TestModel();
  return {
    items: o.items,
    maxId: o.maxId,
    shopState: o.shopState,
  }
}
export class RTestModel {
  private _state?: ITestModel
  private _dispatch?: (action:any)=>void
  private _getState?: ()=>any
  constructor(state?: ITestModel, dispatch?:(action:any)=>void, getState?:()=>ITestModel) {
    this._state = state
    this._dispatch = dispatch
    this._getState = getState
  }
  get items() : ShopCartItem[]{
    if(this._getState) {
      return this._getState().TestModelReducer.items
    } else {
      return this._state.items
    }
  }
  set items(value:ShopCartItem[]) {
    if(this._state) {
      this._state.items = value
    } else {
      // dispatch change for item items
      this._dispatch({type:'TestModel_items', payload:value})
    }
  }
  get maxId() : number{
    if(this._getState) {
      return this._getState().TestModelReducer.maxId
    } else {
      return this._state.maxId
    }
  }
  set maxId(value:number) {
    if(this._state) {
      this._state.maxId = value
    } else {
      // dispatch change for item maxId
      this._dispatch({type:'TestModel_maxId', payload:value})
    }
  }
  get shopState() : TaskState{
    if(this._getState) {
      return this._getState().TestModelReducer.shopState
    } else {
      return this._state.shopState
    }
  }
  set shopState(value:TaskState) {
    if(this._state) {
      this._state.shopState = value
    } else {
      // dispatch change for item shopState
      this._dispatch({type:'TestModel_shopState', payload:value})
    }
  }
  
  // is a reducer
  add(item: ShopCartItem){
    if(this._state) {
      console.log(this.maxId);
      this.items.push({
      ...item, id: this.maxId++
      });
    } else {
      this._dispatch({type:'TestModel_add',payload: item })
    }
  }
  // is task
  async createItem(someName: string) {
      console.log(MSG, this.shopState);
      if (this.shopState == TaskState.RUNNING) {
          return;
      }
      this.shopState = TaskState.RUNNING;
      await new Promise(res => {
          setTimeout(res, DELAY);
      });
      console.log(MSG2, this.shopState);
      this.add({ name: someName });
      this.shopState = TaskState.SUCCESS;
  }
  
  static createItem(someName: string){
    return (dispatcher, getState) => {
      (new RTestModel(null, dispatcher, getState)).createItem(someName)
    }
  }
}

export const TestModelEnums = {
  TestModel_items : 'TestModel_items',
  TestModel_maxId : 'TestModel_maxId',
  TestModel_shopState : 'TestModel_shopState',
  TestModel_add : 'TestModel_add',
}

export const TestModelReducer = (state:ITestModel = init_TestModel(), action) => {
  return immer.produce(state, draft => {
    switch (action.type) {
      case TestModelEnums.TestModel_items: 
        (new RTestModel(draft)).items = action.payload
        break;
      case TestModelEnums.TestModel_maxId: 
        (new RTestModel(draft)).maxId = action.payload
        break;
      case TestModelEnums.TestModel_shopState: 
        (new RTestModel(draft)).shopState = action.payload
        break;
      case TestModelEnums.TestModel_add: 
        (new RTestModel(draft)).add(action.payload)
        break;
    }
  })
}
